import { Request, Response, Handler, raw } from 'express'
import Category from '../models/category.models'

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}


export const getCategory: Handler = async (req, res) => {
    try {
        const category = await Category.findAll();
  
        return res.status(201).json({
            category
          });
      } catch (error) {
      return res.status(500).json({
        status: false,
        msg: "Error en el servidor",
      });
    }
  
  
  };
  