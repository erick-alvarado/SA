import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface BillAttributes extends Model {
    id_bill: number;
    id_auction_sale: number,
    id_sale: number,
    nit : string,
    address: string
  }


  const Bill= db.define<BillAttributes>('Bill', {
    id_bill: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    id_auction_sale: {
        type: DataTypes.NUMBER,
    },
    id_sale: {
        type: DataTypes.NUMBER,
    },
    nit: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    }

  });

  export default Bill;