import { Request, Response } from 'express'

export const healthy = (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'true' })
}
  
  