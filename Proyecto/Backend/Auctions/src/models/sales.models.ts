import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface SaleAttributes extends Model {
    id_sale: number;
    date: string;
    total: number;
    id_customer: number;
    
  }


  const Sale = db.define<SaleAttributes>('Sale', {
    id_sale: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    total: {
        type: DataTypes.NUMBER,
    },
    id_customer: {
        type: DataTypes.NUMBER,
    }
  });
  export default Sale;

