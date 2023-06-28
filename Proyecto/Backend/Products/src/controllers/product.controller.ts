import { Request, Response, Handler, raw } from 'express'
import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectAclCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import { S3_CONFIG } from '../config/config';
const{ AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = S3_CONFIG;

import Product from '../models/product.models'
import { uploadFile, getFileURL } from '../controllers/s3.controller'
import Supplier from '../models/supplier.models';
import Category from '../models/category.models';


const client = new S3Client({
    
  region: AWS_BUCKET_REGION,
  credentials: {
      accessKeyId: AWS_PUBLIC_KEY,
      secretAccessKey: AWS_SECRET_KEY,
  }
})



 export const InsertProduct: Handler = async (req:Request, res:Response) => {
  

  
    let {id,Nombre_Producto,Precio,Cantidad_Producto,Imagen,IdCategoria} = req.body;

    const fechaActual: Date = new Date();
    const hora: number = fechaActual.getHours();
    const minutos: number = fechaActual.getMinutes();
    const segundos: number = fechaActual.getSeconds();
    const unido = hora+":" + minutos+":"+segundos
    const nombrei = unido + ".jpg"
    const cadenaRecortada: string = Imagen.split(",")[1];
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
    try {

    
        const newProduct = await Product.create({
            name: Nombre_Producto,
            description: "Producto nuevo",
            price: Precio,
            stock: Cantidad_Producto,
            img: url,
            id_category: IdCategoria,
            id_supplier: id,
        });
        return res.status(201).json({
            success: true,
            message: 'Producto registrado Correctamente'
          });
      } catch (error) {
      return res.status(400).json({
        success: false,
        massage: "No se pudo registrar en el inventario",
        error: error
      });
    }
  
  };


  export const productByCategory: Handler = async (req:Request, res:Response) => {
    
    let {id_user} = req.params

    const supplier = await Supplier.findOne({
      where:{
          id_user: id_user,
      }
  })

  try {
        /*---------crear arreglo de un producto-----------*/

        let prod = await Product.findAll({
            where: {
                id_supplier: supplier?.id_supplier},
            raw: true,
            });

        return res.status(201).json({prod});
      } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
      });
    }

  };

  export const updateProduct: Handler = async (req:Request, res:Response) => {
    let {id_product} = req.body;
    let { name } = req.body;
    let {description} = req.body;
    let {price} = req.body;
    let {stock} = req.body;
    let {img} = req.body;

    try{
        const Prod = await Product.update({
            name,
            description,
            price,
            stock,
            img,
        },{
            where: {
                id_product:id_product
            }
        });
        if (Prod[0]===1){
            return res.status(201).json({
              msj: 'Producto modificado correctamente'
            });
          }
      


    }catch(error){
        return res.status(500).json({
            status: false,
            msg: "Error en el servidor",
            error: error
          });

    }
  };

  
  export const deleteProduct: Handler = async (req:Request, res:Response) => {

    let {id_product} = req.params;
    try{
        const Prod = await Product.destroy({
            where: {
                id_product:id_product
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



  };

  export const getAllProduct: Handler = async (req:Request, res:Response) => {
    try {
        /*---------crear arreglo de un producto-----------*/


        let prod = await Product.findAll();


        let message :{
          IdProducto: number;
          Nombre_Producto: string;
          Precio: number;
          Imagen: string;
          Nombre_Categoria: string;
          Cantidad: number;
          IdProveedor: number;
          
      }[]= [];

      for (let data of prod){
        let categoria = await Category.findOne({
          where: {id: data.id_category}
      });


        message.push({
          IdProducto: data.id_product,
          Nombre_Producto: data.name,
          Precio: data.price,
          Imagen: data.img,
          Nombre_Categoria: categoria?.name!,
          Cantidad: data.stock,
          IdProveedor: data.id_supplier,

        })
      }

        return res.status(200).json({succes: true, message});
      } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "No se Pudo obtener los Productos",
      });
    }

  };

  export const getProduct: Handler = async (req:Request, res:Response) => {
    let {id_product} = req.params;
    try {
        /*---------crear arreglo de un producto-----------*/


        let prod = await Product.findOne({
          where: {
            id_product: id_product
          }
        });

        return res.status(201).json({prod});
      } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
      });
    }

  };


