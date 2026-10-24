import { mapCommon, clean } from './normalize.js'

export const mapMovie = (raw) => ({
  ...mapCommon(raw, 'movie'),
  director: clean(raw.Director),
})