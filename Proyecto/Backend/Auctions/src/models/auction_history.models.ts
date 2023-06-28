import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface AuctionHistoryAttributes extends Model {
    id_auction_history: number;
    id_auction: number,
    value: number,
    id_bidder: number
  }


  const History= db.define<AuctionHistoryAttributes>('Auction_history', {
    id_auction_history: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    id_auction: {
        type: DataTypes.NUMBER,
    },
    value: {
        type: DataTypes.NUMBER,
    },
    id_bidder: {
        type: DataTypes.NUMBER,
    },




  });

  export default History;