import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user.route'
import CardRouter from './routes/card.route'
import Tarjeta from './routes/Tarjeta.route'
import proveedorRouter from './routes/proveedor.route'
import clienteRouter from './routes/cliente.route'
import loginRouter from './routes/login.route'
import { db } from './database/db'
import fileUpload from 'express-fileupload'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT
const POINT = 'user'
const POINT2 = 'Tarjeta'
const POINTproveedor = 'Proveedor'
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

app.post('/upload', async (req, res) => {
  console.log(req.body)

  
  res.send('URL del recurso');
});
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
app.use(`/${POINT}`, userRouter)
app.use(`/${POINT}`, CardRouter)
app.use(`/${POINT2}`, Tarjeta)
app.use(`/${POINTproveedor}`, proveedorRouter)
app.use(`/${POINTcliente}`, clienteRouter)
app.use(loginRouter)


const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}

main();