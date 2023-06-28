import { Request, Response, Handler } from 'express'
import { uploadFile, getFileURL } from '../controllers/s3.controller'
import User from '../models/user.models'
import Customer from '../models/customer.models'
import Supplier from '../models/supplier.models'
import { hash } from 'bcrypt'


export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const login: Handler = async (req, res) => {

    try{
    const { correo, pass } = req.body;


    const usuario = await User.findOne({
        where:{
            email:      correo,
            password:   pass,
        }
    });
    let tempId, tempName, tempEmail, tempImage;
    console.log(usuario)
    if(usuario?.rol == 1){
        //Customer
        const cliente = await Customer.findOne({
            where:{
                id_user: usuario?.id_user,
            }
        });
        tempId = cliente?.id_customer;
        tempName = cliente?.first_name! + cliente?.last_name!;
        tempEmail = usuario.email;
        tempImage = cliente?.photografy;
    }else{
        //Supplier
        const proveedor = await Supplier.findOne({
            where:{
                id_user: usuario?.id_user,
            }
        });
        tempId = proveedor?.id_supplier;
        tempName = proveedor?.brand;
        tempEmail = usuario?.email;
        tempImage = "URL";
    }
    return res.status(200).json({
        success: true,
        tipo:    usuario?.rol,
        message: {
            "Id":tempId,
            "Nombre":tempName,
            "Correo":tempEmail,
            "Imagen":tempImage
        }
    });

    } catch (error) {
        return res.status(400).json({
            success: false, 
            message: "El usuario no existe"
        });
    }
}
