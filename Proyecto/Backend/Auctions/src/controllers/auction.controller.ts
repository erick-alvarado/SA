import { Request, Response, Handler } from 'express'
import Customer from '../models/customer.models'
import  Supplier from '../models/supplier.models';
import User from '../models/user.models';
import Auction from '../models/auction.models';
import History from '../models/auction_history.models';
import Sale from '../models/auction_sale.models';
import Bill from '../models/bill.models';
import { uploadFile, getFileURL, uploadHTML } from '../controllers/s3.controller'
const nodemailer = require("nodemailer");
import * as fs from 'fs';
import * as handlebars from 'handlebars';

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}

export const postAuction: Handler = async (req, res) => {
    try{
    const { idUser, initialValue, description, productName, deadline } = req.body;
    uploadFile(req.files!.file)
    let archivo = req.files!.file as unknown as File;
    let fileURL = await getFileURL(archivo.name)
    const auction = await Auction.create({
        initial_value:      initialValue as Number,
        actual_value:       initialValue as Number,
        description:        description,
        product_name:       productName,
        deadline:           deadline,
        status:             1,
        image:              fileURL,
        id_seller:          idUser
    });

    return res.status(200).json({
        status: true,
        msg: "Subasta creada con exito"
    });

    } catch(error){
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const bidUp: Handler = async (req, res) => {
    try{
    const { idUser, idAuction, value } = req.body;

    const auction = await Auction.findOne({
        where:{
            id_auction: idAuction,
        }
    });
    //Check if the bid is bigger than the actual one
    if( auction?.actual_value! >= value){
        return res.status(400).json({
            status: false,
            msg: "La puja debe ser mayor a la puja actual"
        });
    }

    //Adding previous bid to auction (bid) history

    if(auction?.id_bidder != null){
        const prevBid = await History.create({
            id_auction: idAuction,
            value:      auction.actual_value,
            id_bidder:  auction.id_bidder
        })
    }

    //Updating bid
    const updatedAuction = await Auction.update({
        actual_value:  value,
        id_bidder:     idUser
        },
        {
        where:{
            id_auction: idAuction
        }});

    return res.status(200).json({
        status: true,
        msg: "Puja realizada con exito"
    });
    
    } catch(error){
        return res.status(400).json({
            status: true,
            msg: "Error en el servidor",
            err: error
        });
    }
}


export const getAuctions: Handler = async (req, res) => {
    try{
    const auctions = await Auction.findAll();

    return res.status(200).json({
        status: true,
        msg: "Subastas obtenidas con exito",
        subastas: auctions
    });

    } catch(error){
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const getBidHistory: Handler = async (req, res) => {
    try{
    const { idUser } = req.params;
    const userAuctions = await Auction.findAll({
        where:{
            id_seller: idUser,
        }
    });

    let auctions: Object[] = [];
    for( let auction of userAuctions){
        let history = await History.findAll({
            where:{
                id_auction: auction.id_auction,
            }
        });

        let bidHistory: Object[] = []; 
        for(let bid of history){
            const user = await User.findOne({
                where:{
                    id_user: bid.id_bidder,
                }
            })
            bidHistory.push({
                email:user?.email,
                bid:  bid.value
            })
        }
        let auctionDetail = {
            auction: auction,
            history: bidHistory,
        }
        auctions.push(auctionDetail);
    }

    return res.status(200).json({
        status: true,
        msg: "Historial de pujas obtenido con exito",
        detalleSubastas: auctions
    });

    } catch(error){
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
            err: error
        });
    }
}

export const endAuction: Handler = async (req, res) => {
    try{
    const { idAuction } = req.body;
    const updateAuction = await Auction.update(
        {status: 2},
        {where:{
            id_auction: idAuction,
    }});
    
    const updatedAuction = await Auction.findOne({
        where:{
            id_auction: idAuction,
        }
    });

    const newSale = await Sale.create({
        id_auction: idAuction
    });

    const newBill = await Bill.create({
        id_auction_sale: newSale.id_auction_sale,
        nit: "FLDSMDFR",
        address: "url"
    });

    const purchaseUser = await User.findOne({
        where:{
            id_user: updatedAuction?.id_bidder,
        }
    })
    let name = "";
    if(purchaseUser?.rol == 1){
        //Customer
        const customer = await Customer.findOne({
            where:{
                id_user: purchaseUser?.id_user,
            }
        });
        name = customer?.first_name! + " " + customer?.last_name!;
    }else{
        //Supplier
        const supplier = await Supplier.findOne({
            where:{
                id_user: purchaseUser?.id_user,
            }
        });
        name = supplier?.brand!;
    }

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;            
    const factura = {
        numeroFactura: newBill.id_bill,
        fecha: formattedDate,
        nombre: name,
        productos: [
          { nombre: updatedAuction?.product_name, cantidad: 1, precio: updatedAuction?.actual_value, total: updatedAuction?.actual_value },
        ],
        totalGeneral: updatedAuction?.actual_value,
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
    

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'justasimpleman1212@gmail.com',
            pass: 'ntxsbjtfqtpdnhcs'
        },
    });

    let supplierMail = await transporter.sendMail({
        from: 'justasimpleman1212@gmail.com',
        to: purchaseUser?.email,
        subject: 'Felicidades, ha ganado una subasta',
        html: `<h1>Usted  ha ganado una subasta por el producto: ${updatedAuction?.product_name}</h1>`
    });

    return res.status(200).json({
        status: true,
        msg: "Subasta terminada exitosamente"
    });
    
    } catch(error){
        return res.status(400).json({
            status: false,
            msg: "Error en el servidor",
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


  export const auctionsdHistory: Handler = async (req, res) => {
    let {idUser} = req.params;
    try {

        const userAuctions = await Auction.findAll({
            where:{
                id_bidder: idUser,
                status: '2'
            }
        });
        let history:{
            id: number;
            name: string,
            description: string,
            image: string;
            link: string;
            total: number;
            
        }[]= [];

        for (let data of userAuctions){
            const sale_auction = await Sale.findOne({
                where:{
                    id_auction: data.id_auction,
                }
            });
            const bill = await Bill.findOne({
                where:{
                    id_auction_sale: sale_auction?.id_auction_sale,
                }
            });
            history.push({
                id:  sale_auction?.id_auction_sale!,
                name: data.product_name,
                description: data.description!,
                image: data.image!,
                link: bill?.address!,
                total: data.actual_value!
            })

        }

        
        return res.status(201).json({history});

    } catch (error) {
        return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
        error: error
        });
    }
}