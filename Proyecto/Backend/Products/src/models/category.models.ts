import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';
export interface CategoryAttributes extends Model {
    id: number;
    name: string

}

const Category = db.define<CategoryAttributes>('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    }
  });
  
  export default Category;
