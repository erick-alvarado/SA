import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route'

dotenv.config()
const app: Application = express()
const PORT = process.env.PORT
const POINT = 'auth'

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '10mb' }))

// routes
app.use(`/${POINT}`, authRouter)


const main = () => {
    app.listen(PORT, () => console.log(`Running in: http://localhost:${PORT}`))
}
  
main();