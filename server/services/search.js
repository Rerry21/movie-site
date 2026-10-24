import { omdbRequest } from './omdbClient.js'
import { cached, TTL } from '../utils/cache.js'
import { mapSummary } from '../utils/mapSummary.js'
import { createHttpError } from '../utils/httpError.js'

const TYPES = ['movie', 'series']

export const searchTitles = ({ query, type, page }) => {
  const q = typeof query === 'string' ? query.trim() : ''

  if (q.length < 2) {
    throw createHttpError(400, 'Search query is too short')
  }

  if (type !== undefined && !TYPES.includes(type)) {
    throw createHttpError(400, 'Invalid type')
  }

  const pageNumber = page === undefined ? 1 : Number(page)

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > 100) {
    throw createHttpError(400, 'Invalid page number')
  }

  const key = `search:${q.toLowerCase()}:${type || 'all'}:${pageNumber}`

  return cached(key, TTL.search, async () => {
    try {
      const raw = await omdbRequest({ s: q, type, page: pageNumber })
      const results = (raw.Search || [])
        .filter((item) => TYPES.includes(item.Type))
        .map(mapSummary)
      const totalResults = Number(raw.totalResults) || results.length

      return {
        query: q,
        page: pageNumber,
        totalResults,
        totalPages: Math.min(Math.ceil(totalResults / 10), 100),
        results,
      }
    } catch (error) {
      if (error.status === 404) {
        return {
          query: q,
          page: pageNumber,
          totalResults: 0,
          totalPages: 0,
          results: [],
        }
      }
      throw error
    }
  })
}