import { clean, toYear } from './normalize.js'

export const mapSummary = (raw) => ({
  id: raw.imdbID,
  type: raw.Type === 'series' ? 'series' : 'movie',
  title: clean(raw.Title) || 'Untitled',
  poster: clean(raw.Poster),
  year: toYear(raw.Year),
  rating: null,
  genres: [],
})