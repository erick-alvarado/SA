import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface CardAttributes extends Model {
    id:         number;
    number:     string;
    expiration: string;
    ccv:        string;
    id_customer:number;
    nombre:     string;
  }


  const Card = db.define<CardAttributes>('Credit_Card', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
    },
    expiration: {
        type: DataTypes.STRING,
    },
    ccv: {
        type: DataTypes.STRING,
    },
    id_customer: {
        type: DataTypes.NUMBER,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  });
  
  export default Card;

