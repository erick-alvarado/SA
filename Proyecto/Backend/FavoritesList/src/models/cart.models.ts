import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface CartAttributes extends Model {
    id: number;
    quantity: number;
    id_customer: number;
    id_product: number;
    
  }


  const Cart = db.define<CartAttributes>('Shopping_Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
    },
    id_customer: {
        type: DataTypes.NUMBER,
    },
    id_product: {
        type: DataTypes.NUMBER,
    }
  });
  export default Cart;

