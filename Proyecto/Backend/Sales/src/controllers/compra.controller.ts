import { Request, Response, Handler } from 'express'
import Product from '../models/product.models'
import Cart from '../models/cart.models'
import Customer from '../models/customer.models'
import  Supplier from '../models/supplier.models';
import User from '../models/user.models';
import Sale from '../models/sales.models';
import Detail from '../models/sales_detail.models';
import Bill from '../models/bill.models';
import { uploadFile, getFileURL, uploadHTML } from '../controllers/s3.controller'
import * as fs from 'fs';
import * as handlebars from 'handlebars';
const nodemailer = require("nodemailer");

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const comprar: Handler = async (req, res) => {

    try{
    let {id, codTarjeta, total, productos} = req.body;

    //Nodemailer config
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'justasimpleman1212@gmail.com',
            pass: 'ntxsbjtfqtpdnhcs'
        },
    });

    //Getting customer 
    const customer = await Customer.findOne({
        where:{
            id_customer: id as number,
        }
    });
    //Getting customer user
    const userCustomer = await User.findOne({
        where:{
            id_user: customer?.id_user,
        }
    });

    //Checking inventory stock
    for(let producto of productos){
        const product = await Product.findOne({
            where: {id_product: producto.idProducto},
            raw: true,
        });

        if(producto.Cantidad > product?.stock!){
            return res.status(400).json({
                success: false,
                message: "Error al crear la factura"
            });
        }
    }
    //Creating new Sale
    let new_Date = new Date();
    let result = new_Date.toLocaleString();
    const sale = await Sale.create({
        date:       result,
        total:      total as number,
        id_customer:id, 
    });
    const productList: object[] = [];
    for(let producto of productos){
        const productBefore = await Product.findOne({
            where: {id_product: producto.idProducto},
            raw: true,
        });
        //Updating product stock
        const prod = await Product.update(
            {stock: productBefore?.stock! - producto.Cantidad},
            {where:{
                id_product: productBefore?.id_product,
            }});
        //Getting supplier email 
        const supplier = await Supplier.findOne({
            where:{
                id_supplier: productBefore?.id_supplier as number,
            }
        });
        const userSupplier = await User.findOne({
            where:{
                id_user: supplier?.id_user,
            }
        });

        //Product out of stock advice
        if(productBefore?.stock! - producto.Cantidad == 0){
            let supplierMail = await transporter.sendMail({
                from: 'justasimpleman1212@gmail.com',
                to: userSupplier?.email,
                subject: 'AVISO FALTA DE STOCK PARA PROVEEDOR',
                html: `<h1>El stock del producto ${productBefore?.name} ha llegado a 0</h1>`
            });
        }
        //Adding sale_detail
        const saleDetail = await Detail.create({
            quantity:   producto.Cantidad,
            id_sale:    sale.id_sale,
            id_product: productBefore?.id_product,
        });

        //Insert in product list
        productList.push({
            nombre:     productBefore?.name,
            cantidad:   producto.Cantidad,
            precio:     productBefore?.price! * 1.1, 
            total:      productBefore?.price! * 1.1 * producto.Cantidad
        });
    }
    const newBill = await Bill.create({
        id_sale: sale.id_sale,
        nit: "FLDSMDFR",
        address: "url"
    });

    const factura = {
        numeroFactura: newBill.id_bill,
        fecha: result,
        nombre: customer?.first_name + " " + customer?.last_name,
        productos: productList,
        totalGeneral: total,
    };

    const facturaHtml = generarFacturaHtml(factura);
    const htmlSinEscape = facturaHtml.replace(/\r?\n|\r/g, '');

    uploadHTML(`factura-${newBill.id_bill}.html`,htmlSinEscape);
    let fileURL = await getFileURL(`factura-${newBill.id_bill}.html`);

    const updatedBill = await Bill.update(
        {address: fileURL},
        {where:{
            id_bill: newBill.id_bill,
        }}
    );

    let customerMail = await transporter.sendMail({
        from: 'justasimpleman1212@gmail.com',
        to: userCustomer?.email,
        subject: 'FACTURA ELECTRONICA',
        html: fileURL
    });

    return res.status(200).json({
        success: true,
        message: "Factura Creada!"
    });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Error al crear factura",
            err: error
        });
    }
}

function generarFacturaHtml(datosFactura: any): string {
    const template = fs.readFileSync('./bill.html', 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(datosFactura);
    return html;
  }