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


//-----------------------S3--------------------------------
interface ConfigS3 {
    AWS_BUCKET_NAME: string;
    AWS_BUCKET_REGION: string;
    AWS_PUBLIC_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_BUCKET_URL: string;
}

export const S3_CONFIG: ConfigS3 = {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
    AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY as string,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY as string,
    AWS_BUCKET_URL: process.env.AWS_BUCKET_URL as string,
};

