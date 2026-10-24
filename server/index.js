import express from 'express'
import cors from 'cors'
import config from './utils/config.js'
import healthRoutes from './routes/health.js'
import movieRoutes from './routes/movies.js'
import seriesRoutes from './routes/series.js'
import searchRoutes from './routes/search.js'
import listRoutes from './routes/lists.js'
import genreRoutes from './routes/genres.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: config.clientOrigin }))
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/series', seriesRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/genres', genreRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})