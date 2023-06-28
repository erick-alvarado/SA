import { Request, Response, Handler } from 'express'
import Card from '../models/card.models'

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const postCard: Handler = async (req, res) => {

    try{
    let { number, expiration, ccv, id_customer } = req.body;

    //Check if the card is already in use by the same user
    const repeatedCard = await Card.findAll({
        where:{
            number: number,
            id_customer: id_customer,
        }
    })

    if(repeatedCard.length>0){
        return res.status(301).json({
            status: false,
            msg: "La tarjeta xxxx xxxx xxxx " + number.slice(-5) + " ya se encuentra registrada por el mismo usuario  "
        });
    }

    //Check if the card has 16 digits
    if(number.length !== 16){
        return res.status(301).json({
            status: false,
            msg: "La numberacion de la tarjeta es invalida"
        });
    }

    const card = await Card.create({
        number:     number,
        expiration: expiration,
        ccv:        ccv,
        id_customer:id_customer,
    })

   
    return res.status(200).json({
        status: true,
        msg: "Tarjeta xxxx xxxx xxxx "+ number.slice(-5) +" anadida con exito"
    });

    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const getCards: Handler = async (req, res) => {

    try{
    let { idUser } = req.params;

    const cards = await Card.findAll({
        where:{
            id_customer: idUser,
        }
    })

    return res.status(200).json({
        status: true,
        tarjetas: cards
    });
    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
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





