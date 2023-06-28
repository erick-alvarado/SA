import { Request, Response, Handler } from 'express'
import Product from '../models/product.models'
import Customer from '../models/customer.models'
import  Supplier from '../models/supplier.models';
import User from '../models/user.models';
import List from '../models/list.models';

const nodemailer = require("nodemailer");

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}



export const InsertProduct: Handler = async (req:Request, res:Response) => {
    let { id_product,id_user} = req.body;

    try {

        const cliente = await Customer.findOne({
          where:{
              id_user: id_user,
          }
        })
        const newProduct = await List.create({
            id_product : id_product,
            id_customer: cliente?.id_customer

        });
          return res.status(201).json({
              status: true,
              id: newProduct.id_list,       
              idProduct: newProduct.id_product,
              id_customer: newProduct.id_customer,
              msj: 'Producto insertado con exito'
            });
        } catch (error) {
        return res.status(500).json({
          status: false,
          msg: "Error en el servidor",
          error: error
        });
      }
  };

  export const getProductList: Handler = async (req:Request, res:Response) => {
    let {id_user} = req.params;
    console.log(id_user)
    try {

        let cliente = await Customer.findOne({
          where: {
            id_user: id_user
          }
        });

        console.log(cliente?.id_customer)

        let list = await List.findAll({
            where: {
                id_customer: cliente?.id_customer
        
            }
        });
       let lista :{
            id_product: number;
            name?: string;
            price?: number,
            stock?: number,
            img?: string,
            description?: string                   
            
        }[]= [];
        for(let data of list){
            let prod = await Product.findOne({
                where: {id_product: data.id_product},
                raw: true,
            });
            lista.push({
                'id_product':data.id_product,
                'name': prod?.name,
                'price': prod?.price! + (prod?.price! * 0.1),
                'stock': prod?.stock!,
                'img': prod?.img,
                'description': prod?.description
            })
        }

        return res.status(201).json({lista});
      } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
        error:error
      });
    }

  };


