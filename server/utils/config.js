import dotenv from 'dotenv'

dotenv.config()

const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    apiBasUrl: process.env.API_BASE_URL || '',
    apikey: process.env.API_KEY || '',
}

export default config