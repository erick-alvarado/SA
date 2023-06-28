import { Request, Response, Handler } from 'express'
import Product from '../models/product.models'
import Cart from '../models/cart.models'
import Customer from '../models/customer.models'


export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}


export const postProduct: Handler = async (req, res) => {   
    try {
    const { idProduct, idUser } = req.body;

    //Getting customer by user id
    const customer = await Customer.findOne({
        where:{
            id_user: idUser as number,
        }
    })

    //Checking if the product is already in the shopping cart
    const takenProduct = await Cart.findOne({
        where:{
            id_customer: customer?.id_customer,
            id_product: idProduct,
        }
    })

    if(takenProduct !== null) {
        return res.status(400).json({
            status: false,
            msg: "El producto ya ha sido anadido al carrito de compras"
        });
    }

    const product = await Cart.create({
        quantity:       1,
        id_customer:    customer?.id_customer,
        id_product:     idProduct   
    })

    return res.status(200).json({
        status: true,
        msg: "Producto anadido exitosamente"
    });

    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const addProduct: Handler = async (req, res) => {

    try{
    const { idProduct, idUser } = req.body;

    //Getting customer by user id
    const customer = await Customer.findOne({
        where:{
            id_user: idUser as number,
        }
    })

    //Checking if the product is in the shopping cart
    const takenProduct = await Cart.findOne({
        where:{
            id_customer: customer?.id_customer,
            id_product: idProduct,
        }
    })

    if(takenProduct === null) {
        return res.status(400).json({
            status: false,
            msg: "El producto no se encuentra en el carrito de compras"
        });
    }

    const product = await Cart.update(
        {quantity: takenProduct.quantity + 1},
        {where:{
            id_customer: customer?.id_customer,
            id_product: idProduct,
        }})
    return res.status(200).json({
        status: true,
        msg: "Producto incrementado exitosamente"
    });

    } catch (error) {
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const deleteProduct: Handler = async (req, res) => {
    let {id_user,id_product} = req.body;

    const customer = await Customer.findOne({
        where:{
            id_user: id_user,
        }
    })
       
    try{
        const cart = await Cart.destroy({
            where: {
                id_customer: customer?.id_customer,
                id_product: id_product
            }
        });

        return res.status(201).json({
            status: true,
            msj: 'Producto Eliminado con exito'
          });
      
    }catch(error){
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
          });

    }

}

export const getCart: Handler = async (req, res) => {
    let {idUser} = req.params;
    //Getting customer by user id
    try{
    //--- devuelve todos los productos del carrito del cliente 

    const customer = await Customer.findOne({
        where:{
            id_user: idUser,
        }
    })

    let cart = await Cart.findAll({
        where: {
            id_customer: customer?.id_customer
    
        }
    });

    let carrito  :{
        id_product: number;
        name?: string;
        price?: number;
        total: number;
        
    }[]= [];
    let contador = 0;

    for(let data of cart){
        let prod = await Product.findOne({
            where: {id_product: data.id_product},
            raw: true,
        });
        contador = contador + 1 
        carrito.push({
            'id_product':data.id_product,
            'name': prod?.name,
            'price': prod?.price! + (prod?.price! * 0.1),
            'total': data?.quantity * prod?.price! + (prod?.price! * 0.1)
        
        })
    }
    return res.status(201).json({carrito});
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
        });
    }
}


