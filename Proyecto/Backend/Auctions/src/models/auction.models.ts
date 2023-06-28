import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface AuctionAttributes extends Model {
    id_auction: number;
    initial_value: number,
    actual_value: number,
    description: string,
    product_name: string,
    deadline: string,
    status: number,
    image: string,
    id_seller: number,
    id_bidder: number,
  }


  const Auction= db.define<AuctionAttributes>('Auction', {
    id_auction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    initial_value: {
        type: DataTypes.NUMBER,
    },
    actual_value: {
        type: DataTypes.NUMBER,
    },
    description: {
        type: DataTypes.STRING,
    },
    product_name: {
        type: DataTypes.STRING,
    },
    deadline: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.NUMBER,
    },
    image: {
        type: DataTypes.STRING,
    },
    id_seller: {
        type: DataTypes.NUMBER,
    },
    id_bidder: {
        type: DataTypes.NUMBER,
    },




  });

  export default Auction;