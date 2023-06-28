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

export const getSupplierSales: Handler = async (req, res) => {
    let {idUser} = req.params;

    //- obtengo el id del proveedor
    try {

    const supplier = await  Supplier.findOne({
        where:{
            id_user: idUser,
        }
    })

    if (supplier == undefined){
        return res.status(500).json({
            status: false,
            msg: "Error no existe el proveedor",
        });

    }

    // obtengo el  id de las ventas de ese proveedor

    const prod = await  Product.findAll({
        where:{
            id_supplier: supplier?.id_supplier,
        }
    })

    if (prod == undefined){
        return res.status(500).json({
            status: false,
            msg: "Error el proveedor no tiene productos subidos al stock",
        });

    }
    
    let hystory:{
        id_supplier: number;
        id_sale: number,
        date: string,
        quantity: number;
        product: string;
        total: number;
        
    }[]= [];
    let totalSum = 0;
    let quantitySum = 0;
    let idp = 0;

    // recorro la tabla venta
    for(let data of prod){
        let detail = await Detail.findOne({
            where: {id_product: data.id_product},
            raw: true,
        });
                

        if (detail?.quantity !== undefined){
            let venta = await Sale.findOne({
                where: {id_sale: detail.id_sale},
                raw: true,
            });
            let quantity = detail?.quantity!;
            let total = quantity * data.price;
            let idprov = data.id_supplier
            hystory.push({
                'id_supplier': data.id_supplier,
                'id_sale': detail.id_detail!,
                'date': venta?.date!,
                'quantity': detail?.quantity!,
                'product': data.name,
                'total': detail?.quantity!* data.price
            })
            totalSum += total;
            quantitySum += quantity;
            idp = idprov
         }
    }

    let Total = {
        totalSum: totalSum,
        quantitySum: quantitySum,
        id_supplier: idp
      };

    return res.status(201).json({hystory});

    



} catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
      error: error
    });
  }

}


export const getTotal: Handler = async (req, res) => {
    let {idUser} = req.params;

    //- obtengo el id del proveedor
    try {

    const supplier = await  Supplier.findOne({
        where:{
            id_user: idUser,
        }
    })

    if (supplier == undefined){
        return res.status(500).json({
            status: false,
            msg: "Error no existe el proveedor",
        });

    }

    // obtengo el  id de las ventas de ese proveedor

    const prod = await  Product.findAll({
        where:{
            id_supplier: supplier?.id_supplier,
        }
    })

    if (prod == undefined){
        return res.status(500).json({
            status: false,
            msg: "Error el proveedor no tiene productos subidos al stock",
        });

    }
    
    let detalle:{
        id_supplier: number;
        quantity: number;
        product: string;
        total: number;
        
    }[]= [];
    let totalSum = 0;
    let quantitySum = 0;
    let idp = 0;

    // recorro la tabla venta
    for(let data of prod){
        let detail = await Detail.findOne({
            where: {id_product: data.id_product},
            raw: true,
        });
        if (detail?.quantity !== undefined){
            let quantity = detail?.quantity!;
            let total = quantity * data.price;
            let idprov = data.id_supplier
            detalle.push({
                'id_supplier': data.id_supplier,
                'quantity': detail?.quantity!,
                'product': data.name,
                'total': detail?.quantity!* data.price
            })
            totalSum += total;
            quantitySum += quantity;
            idp = idprov
         }
    }

    let Total = {
        totalSum: totalSum,
        quantitySum: quantitySum,
        id_supplier: idp
      };

    return res.status(201).json({Total});

    



} catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
      error: error
    });
  }

}



export const postSale: Handler = async (req, res) => {

    const{ idUser } = req.body;
    let total = 0;
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

    //Getting customer by user id
    const customer = await Customer.findOne({
        where:{
            id_user: idUser as number,
        }
    })

    const shoppingCart = await Cart.findAll({
        where:{
            id_customer: customer?.id_customer,
        }
    })

    //Checking inventory stock
    for(let detail of shoppingCart){
        const product = await Product.findOne({
            where: {id_product: detail.id_product},
            raw: true,
        });

        if(detail.quantity > product?.stock!){
            return res.status(400).json({
                status: true,
                msg: "No hay stock suficiente del producto: " + product?.name
            });
        }

        //Adding total of each product 
        total = total + detail.quantity * (product?.price! * 1.1);
    }

    //Creating new Sale
    let new_Date = new Date();
    let result = new_Date.toLocaleString();
    const sale = await Sale.create({
        date:       result,
        total:      total,
        id_customer:customer?.id_customer, 
    });

    const productos: object[] = [];
    //Decreasing product stock
    for(let detail of shoppingCart){
        const productBefore = await Product.findOne({
            where: {id_product: detail.id_product},
            raw: true,
        });

        const prod = await Product.update(
            {stock: productBefore?.stock! - detail.quantity},
            {where:{
                id_product: productBefore?.id_product,
            }})
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
        })
        //Product out of stock advice
        if(productBefore?.stock! - detail.quantity == 0){
            let supplierMail = await transporter.sendMail({
                from: 'justasimpleman1212@gmail.com',
                to: userSupplier?.email,
                subject: 'AVISO FALTA DE STOCK PARA PROVEEDOR',
                html: `<h1>El stock del producto ${productBefore?.name} ha llegado a 0</h1>`
            });
        }

        //Adding sale_detail
        const saleDetail = await Detail.create({
            quantity:   detail.quantity,
            id_sale:    sale.id_sale,
            id_product: productBefore?.id_product,
        });

        //Deleting from shoping cart
        const deteledCart = await Cart.destroy({
            where:{
                id: detail.id,
            }
        })

        //Insert in product list
        productos.push({
            nombre:     productBefore?.name,
            cantidad:   detail.quantity,
            precio:     productBefore?.price! * 1.1, 
            total:      productBefore?.price! * 1.1 * detail.quantity
        })
    }

    
    const user = await User.findOne({
        where:{
            id_user: idUser,
        }
    })

    const newBill = await Bill.create({
        id_sale: sale.id_sale,
        nit: "FLDSMDFR",
        address: "url"
    });

    const factura = {
        numeroFactura: newBill.id_bill,
        fecha: result,
        nombre: customer?.first_name + " " + customer?.last_name,
        productos: productos,
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
        to: user?.email,
        subject: 'FACTURA ELECTRONICA',
        html: fileURL
    });


    return res.status(200).json({
        status: true,
        msg: 'Compra realizada con exito, total: ' + total
    });
}

function generarFacturaHtml(datosFactura: any): string {
    const template = fs.readFileSync('./bill.html', 'utf-8');
    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate(datosFactura);
    return html;
  }



export const purchasesHistory: Handler = async (req, res) => {
    let {idUser} = req.params;
    try {

        const Cliente= await  Customer.findOne({
            where:{
                id_user: idUser,
            }
        })

        const venta = await  Sale.findAll({
            where:{
                id_customer: Cliente?.id_customer,
            }
        })

        let purchases:{
            id_sale: number;
            date: string;
            total: number;
            quantity: number,
            product: string;
            link: string
            
        }[]= [];
        for (let data of venta){
            let detail = await Detail.findAll({
                where: {id_sale: data.id_sale},
                raw: true,
            });
            for (let data2 of detail){
                let prod = await Product.findOne({
                    where: {id_product: data2?.id_product},
                    raw: true,
                });
                const bill = await Bill.findOne({
                    where:{
                        id_sale: data.id_sale,
                    }
                });
                purchases.push({
                    'id_sale': data2?.id_detail!,
                    'date': data.date,
                    'total':data.total,
                    'quantity': data2?.quantity!,
                    'link': bill?.address!,
                    'product': prod?.name!
                    
                })
                
            }
            
            
        }
        return res.status(201).json({purchases});

    } catch (error) {
        return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
        error: error
        });
    }
}
