import { omdbRequest } from './omdbClient.js'
import { cached, TTL } from '../utils/cache.js'
import { mapMovie } from '../utils/mapMovie.js'
import { mapSeries, mapSeason } from '../utils/mapSeries.js'
import { createHttpError } from '../utils/httpError.js'
import { assertTitleId, parseSeason } from '../utils/validate.js'

export const getTitle = (id) => {
  assertTitleId(id)

  return cached(`title:${id}`, TTL.details, async () => {
    const raw = await omdbRequest({ i: id, plot: 'full' })
    if (raw.Type === 'series') return mapSeries(raw)
    if (raw.Type === 'movie') return mapMovie(raw)
    throw createHttpError(404, 'Title not found')
  })
}

export const getMovie = async (id) => {
  const title = await getTitle(id)
  if (title.type !== 'movie') {
    throw createHttpError(404, 'Movie not found')
  }
  return title
}

export const getSeries = async (id) => {
  const title = await getTitle(id)
  if (title.type !== 'series') {
    throw createHttpError(404, 'Series not found')
  }
  return title
}

export const getSeason = (id, season) => {
  assertTitleId(id)
  const number = parseSeason(season)

  return cached(`season:${id}:${number}`, TTL.season, async () => {
    const raw = await omdbRequest({ i: id, Season: number })
    return mapSeason(raw)
  })
}