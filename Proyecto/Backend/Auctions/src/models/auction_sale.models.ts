import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface  AuctionsaleAttributes extends Model {
    id_auction_sale: number;
    id_auction: number
  }


  const Sale= db.define< AuctionsaleAttributes>('Auction_sale', {
    id_auction_sale: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    id_auction: {
        type: DataTypes.NUMBER,
    }



  });

  export default Sale;