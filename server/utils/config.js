import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(currentDir, '../.env') })

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  apiBaseUrl: process.env.API_BASE_URL || '',
  apiKey: process.env.API_KEY || '',
}

export default config