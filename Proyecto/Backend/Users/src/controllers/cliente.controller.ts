import { Request, Response, Handler } from 'express'
import { uploadFile, getFileURL } from '../controllers/s3.controller'
import User from '../models/user.models'
import Customer from '../models/customer.models'
import Supplier from '../models/supplier.models'
import { hash } from 'bcrypt'
import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectAclCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import { S3_CONFIG } from '../config/config';
const{ AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = S3_CONFIG;


const client = new S3Client({
    
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
  })


export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const postUser: Handler = async (req, res) => {

    try{
    let { nombre,apellido,cel,correo,pass,imagen } = req.body;
    const fechaActual: Date = new Date();
    const hora: number = fechaActual.getHours();
    const minutos: number = fechaActual.getMinutes();
    const segundos: number = fechaActual.getSeconds();
    const unido = hora+":" + minutos+":"+segundos
    const nombrei = unido + ".jpg"
    const cadenaRecortada: string = imagen.split(",")[1];
    let buff = Buffer.from(cadenaRecortada, 'base64');

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: nombrei,
        Body: buff,
        ContentType: "image"
    }
    const command = new PutObjectCommand(uploadParams)
    await client.send(command)
    console.log(nombrei)
    let url = 'https://sag11.s3.amazonaws.com/' + nombrei


    const newUser = await User.create({
        email:      correo, 
        password:   pass,
        rol:        1,
    });


    const newCustomer = await Customer.create({
        first_name:     nombre, 
        last_name:      apellido,
        phone_number:   cel as number,
        photografy:     url,
        id_user:        newUser.id_user,
    });
    

    return res.status(200).json({
        success: true,
        message: "Usuario creado exitosamente"
    });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Ocurrio un error al crear el usuario",
        });
    }
}

export const getUser: Handler = async (req, res) => {

    try{
    let { idUser } = req.params;

    const user = await User.findOne({
        where:{
            id_user:    idUser,
        }
    });

    //Checks if the given id is valid 
    if(user === null){
        return res.status(400).json({
            status: false,
            msg: "No se encontro ningun usuario con el id proporcionado"
        });
    }

    //Checks if its a customer or supplier
    if(user.rol == 1){
        const customer = await Customer.findOne({
            where:{
                id_user:    user.id_user,
            }
        });

        return res.status(200).json({
            status:     true,
            usuario:    user,
            cliente:    customer
        });
    }else{
        const supplier = await Supplier.findOne({
            where:{
                id_user: user.id_user,
            }
        });

        return res.status(200).json({
            status:     true,
            usuario:    user,
            proveedor:  supplier
        });
    }

    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }

}




