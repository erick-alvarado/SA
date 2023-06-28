import { Request, Response, Handler } from 'express'
import { uploadFile, getFileURL } from '../controllers/s3.controller'
import User from '../models/user.models'
import Customer from '../models/customer.models'
import Supplier from '../models/supplier.models'
import { hash } from 'bcrypt'


export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const postUser: Handler = async (req, res) => {

    try{
    let { email, password, rol } = req.body;
    //Check if the email is already in use 
    const getUser = await User.findAll({
        where:{
            email:  email,
        }
    });

    if(getUser.length>0){
        return res.status(301).json({
            status: false,
            msg: "Ya existe un usuario registrado con el correo: " + email
        });
    }

    const hashed = await hash(password, 10);
    const newUser = await User.create({
        email:      email, 
        password:   hashed,
        rol:        rol,
    });

    //Check if its a customer or supplier 1 = customer, 2 = supplier
    if(rol == 1){
        uploadFile(req.files!.file)
        let archivo = req.files!.file as unknown as File;
        let fileURL = await getFileURL(archivo.name)
        const newCustomer = await Customer.create({
            first_name:     req.body.first_name, 
            last_name:      req.body.last_name,
            phone_number:   req.body.phone_number as number,
            photografy:     fileURL,
            id_user:        newUser.id_user,
        });
    }else{
        const newSupplier = await Supplier.create({
            brand:      req.body.brand, 
            address:    req.body.address,
            id_user:    newUser.id_user,
        });
    }

    return res.status(200).json({
        status: true,
        msg: "Usuario registrado con exito, correo: " + newUser.email
    });

    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
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




