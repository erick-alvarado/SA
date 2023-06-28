import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';


export interface UserAttributes extends Model {
    id_user:    number;
    email:      string;
    password:   string;
    rol:        number;
  }


  const User = db.define<UserAttributes>('User', {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.NUMBER,
    }
  });
  
  export default User;

