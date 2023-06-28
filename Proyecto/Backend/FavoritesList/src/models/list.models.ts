import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface FavoritesListAttributes extends Model {
    id_list: number;
    id_product: number;
    id_customer: number;
  }


  const List = db.define<FavoritesListAttributes>('Favorites_list', {
    id_list: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_product: {
        type: DataTypes.NUMBER,
    },
    id_customer: {
        type: DataTypes.NUMBER,
    }
  });



  export default List;