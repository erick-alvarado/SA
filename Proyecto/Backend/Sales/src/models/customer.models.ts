import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface CustomerAttributes extends Model {
    id_customer: number;
    first_name: string;
    last_name: string;
    phone_number: number;
    photografy: string;
    id_user: number;
  }


  const Customer = db.define<CustomerAttributes>('Customer', {
    id_customer: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.NUMBER,
    },
    photografy: {
        type: DataTypes.STRING,
    },
    id_user: {
        type: DataTypes.NUMBER,
    }
  });
  
  export default Customer;
