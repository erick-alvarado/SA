import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import salesRouter from './routes/favoriteslist.route'
import { db } from './database/db'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT
const POINT = 'favoriteslist'

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))


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


const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}

main();