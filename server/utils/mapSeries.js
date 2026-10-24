import { mapCommon, clean, toNumber } from './normalize.js'

export const mapSeries = (raw) => ({
  ...mapCommon(raw, 'series'),
  seasons: toNumber(raw.totalSeasons),
})

export const mapEpisode = (raw) => ({
  id: clean(raw.imdbID),
  episode: toNumber(raw.Episode),
  title: clean(raw.Title) || `Episode ${raw.Episode}`,
  released: clean(raw.Released),
  rating: toNumber(raw.imdbRating),
  overview: null,
  runtime: null,
})

export const mapSeason = (raw) => ({
  seriesTitle: clean(raw.Title),
  season: toNumber(raw.Season),
  totalSeasons: toNumber(raw.totalSeasons),
  episodes: (raw.Episodes || [])
    .map(mapEpisode)
    .sort((a, b) => (a.episode || 0) - (b.episode || 0)),
})