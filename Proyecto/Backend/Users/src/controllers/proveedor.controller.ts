import { Request, Response, Handler } from 'express'
import { uploadFile, getFileURL } from '../controllers/s3.controller'
import User from '../models/user.models'
import Customer from '../models/customer.models'
import Supplier from '../models/supplier.models'
import { hash } from 'bcrypt'


export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const registrarProveedor: Handler = async (req, res) => {

    try{
    const { correo, pass, Nombre_Empresa, Direccion } = req.body;
    //Check if the email is already in use 
    const getUser = await User.findAll({
        where:{
            email:  correo,
        }
    });

    if(getUser.length>0){
        return res.status(301).json({
            success: false,
            message: "Ocurrio un error al crear el usuario"
        });
    }

    
    const newUser = await User.create({
        email:      correo, 
        password:   pass,
        rol:        2,
    });

    const newSupplier = await Supplier.create({
        brand:      Nombre_Empresa, 
        address:    Direccion,
        id_user:    newUser.id_user,
    });

    return res.status(200).json({
        success: true,
        message: "Usuario creado exitosamente"
    });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Ocurrio un error al crear el usuario"
        });
    }
}
