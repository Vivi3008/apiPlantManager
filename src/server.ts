import express from 'express'
import routes from './routes'
import * as dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(routes);

app.listen(process.env.PORT || 3300)