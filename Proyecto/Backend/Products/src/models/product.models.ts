import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface ProductAttributes extends Model {
    id_product: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    img: string;
    id_category: number;
    id_supplier: number;
    
  }


  const Product = db.define<ProductAttributes>('Product', {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.NUMBER,
    },
    stock: {
        type: DataTypes.NUMBER,
    },
    img: {
        type: DataTypes.STRING,
    },
    id_category: {
        type: DataTypes.NUMBER,
    },
    id_supplier: {
        type: DataTypes.NUMBER,
    }
  });
  export default Product;

