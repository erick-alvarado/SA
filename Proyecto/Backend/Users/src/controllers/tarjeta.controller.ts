import { Request, Response, Handler } from 'express'
import Card from '../models/card.models'

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const postCard: Handler = async (req, res) => {

    try{
    let { notarjeta,nombre, id } = req.body;


    const card = await Card.create({
        number:     notarjeta,
        expiration: '17/12/2026',
        ccv:        '123',
        id_customer: id,
        nombre: nombre
    })

   
    return res.status(200).json({
        success: true,
        message: "Tarjeta registrada exitosamente"
    });


    } catch (error) {
        return res.status(400).json({
            succes: false,
            message: "Ocurrio un error al registrar la tarjeta"
        });
    }
}

export const getCards: Handler = async (req, res) => {

    try{
    let { idCliente } = req.body;

    const cards = await Card.findAll({
        where:{
            id_customer: idCliente,
        }
    })

    let message :{
        idTarjeta: number;
        notarjeta: string;
        nombre: string;
        
    }[]= [];

    for (let data of cards){
        message.push({
            idTarjeta: data.id,
            notarjeta: data.number,
            nombre: data.nombre
        })
    }

    return res.status(200).json({
        success: true,
        message
    });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Ocurrio un error al consultar las tarjetas del cliente",
            
        });
    }
}

export const deleteCard: Handler = async (req, res) => {

    try{
    let { idCard } = req.params;

    const deletedCard = await Card.destroy({
        where:{
            id: idCard,
        }
    })
   
    return res.status(200).json({
        status: true,
        msg: "Tarjeta eliminada con exito"
    });
    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
}





