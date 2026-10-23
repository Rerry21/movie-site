import express from 'express'
import cors from 'cors'
import config from './utils/config.js'
import healthRoutes from './routes/health.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: config.clientOrigin }))
app.use(express.json())

app.use('/api/health', healthRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
})