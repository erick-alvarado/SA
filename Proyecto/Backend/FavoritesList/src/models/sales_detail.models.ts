import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface Sale_DetailAttributes extends Model {
    id_detail: number;
    quantity: number;
    id_sale: number;
    id_product: number;
    
  }


  const Detail = db.define<Sale_DetailAttributes>('Sale_Detail', {
    id_detail: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
    },
    id_sale: {
        type: DataTypes.NUMBER,
    },
    id_product: {
        type: DataTypes.NUMBER,
    }
  });
  export default Detail;

