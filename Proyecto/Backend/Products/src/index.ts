import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import ProductRouter from './routes/category.route'
import InventarioRouter from './routes/inventario.route'
import healtRouter from './routes/product.route'

import { db } from './database/db'
import fileUpload from 'express-fileupload'
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT
const POINT = 'Proveedor'
const POINT2 = 'Inventario'
const POINT3 = 'product'

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(express.json({ limit: '100mb' }))




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

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
})) 

// routes
app.use(`/${POINT}`, ProductRouter)
app.use(`/${POINT2}`, InventarioRouter)
app.use(`/${POINT3}`, healtRouter)

const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}

main();