import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectAclCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import { S3_CONFIG } from '../config/config';
import fs from 'fs'


const{ AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_URL } = S3_CONFIG;

const client = new S3Client({
    
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
})

//Uploads a file to the s3 bucket
export const uploadFile = async (foto:any) =>{
    const fechaActual: Date = new Date();
    const hora: number = fechaActual.getHours();
    const minutos: number = fechaActual.getMinutes();
    const segundos: number = fechaActual.getSeconds();
    const unido = hora+":" + minutos+":"+segundos
    const nombrei = unido + ".jpg"
    let buff = Buffer.from(foto, 'base64');

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: nombrei,
        Body: buff,
        ContentType: "image"
    }
    const command = new PutObjectCommand(uploadParams)
    await client.send(command)
    return  nombrei;
    
};

//Sends a file name in the s3 bucket and returns an url to access it
export const getFileURL = async(filename:string) => {
    const command = new GetObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: filename
    })
    return  (AWS_BUCKET_URL + filename) as string
}
