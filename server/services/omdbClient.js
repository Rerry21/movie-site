import axios from 'axios'
import config from '../utils/config.js'
import { createHttpError } from '../utils/httpError.js'

const client = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 8000,
})

const NOT_FOUND = [
  'Movie not found!',
  'Incorrect IMDb ID.',
  'Series or season not found!',
  'Error getting data.',
]

const toHttpError = (message = '') => {
  if (NOT_FOUND.includes(message)) {
    return createHttpError(404, 'Not found')
  }
  if (message === 'Too many results.') {
    return createHttpError(400, 'Search is too broad, try a more specific title')
  }
  if (message === 'Request limit reached!') {
    return createHttpError(429, 'Daily request limit reached, try again later')
  }
  if (message === 'Invalid API key!' || message === 'No API key provided.') {
    console.error('OMDb rejected the API key. Check API_KEY in server/.env')
    return createHttpError(502, 'Data provider rejected the request')
  }
  console.error(`OMDb error: ${message}`)
  return createHttpError(502, 'Data provider returned an error')
}

export const omdbRequest = async (params) => {
  if (!config.apiBaseUrl || !config.apiKey) {
    console.error('API_BASE_URL or API_KEY is missing in server/.env')
    throw createHttpError(500, 'Data provider is not configured')
  }

  let data

  try {
    const response = await client.get('/', {
      params: { apikey: config.apiKey, ...params },
    })
    data = response.data
  } catch (error) {
    data = error.response?.data
    if (!data || typeof data !== 'object') {
      const status = error.code === 'ECONNABORTED' ? 504 : 502
      console.error(`OMDb request failed: ${error.message}`)
      throw createHttpError(status, 'Data provider is unavailable')
    }
  }

  if (data.Response === 'False') {
    throw toHttpError(data.Error)
  }

  return data
}