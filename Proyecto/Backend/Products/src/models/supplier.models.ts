import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface SupplierAttributes extends Model {
    id_supplier: number;
    brand: string;
    address: string;
    id_user: number;
  }


  const Supplier = db.define<SupplierAttributes>('Supplier', {
    id_supplier: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    id_user: {
        type: DataTypes.NUMBER,
    }
  });
  
  export default Supplier;

