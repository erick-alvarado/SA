import {config} from 'dotenv'


config()

//-------------------------DB------------------------------
interface ConfigDB {
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
}

export const DB_CONFIG: ConfigDB = {
    DB_HOST: process.env.DB_HOST as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
};
