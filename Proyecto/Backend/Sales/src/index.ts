import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import salesRouter from './routes/sales.route'
import cartRouter from './routes/shoppingCart.route'
import comprasRouter from './routes/compras.route'
import fileUpload from 'express-fileupload'
import { db } from './database/db'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT
const POINT = 'sales'
const POINTcliente = 'Cliente'

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

//S3
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
})) 



//DB INITIALIZATION
const dbInitialization = async () => {
    try {
      await db.authenticate();
      console.log('Database is connected...');
    } catch (e) {
      console.log(e);
    }
  };
  
dbInitialization();


// routes
app.use(`/${POINT}`, salesRouter);
app.use(`/${POINT}`, cartRouter);
app.use(`/${POINTcliente}`, comprasRouter);


const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}

main();

export default app;