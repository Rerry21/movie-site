export const clean = (value) => {
  if (value === undefined || value === null) return null
  const text = String(value).trim()
  if (!text || text === 'N/A') return null
  return text
}

export const toNumber = (value) => {
  const text = clean(value)
  if (text === null) return null
  const number = Number(text.replace(/,/g, ''))
  return Number.isFinite(number) ? number : null
}

export const toList = (value) => {
  const text = clean(value)
  if (!text) return []
  return text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const toYear = (value) => {
  const text = clean(value)
  if (!text) return null
  const match = text.match(/\d{4}/)
  return match ? Number(match[0]) : null
}

export const toRuntime = (value) => {
  const text = clean(value)
  if (!text) return null
  const match = text.match(/\d+/)
  return match ? Number(match[0]) : null
}

export const mapCommon = (raw, type) => ({
  id: raw.imdbID,
  type,
  title: clean(raw.Title) || 'Untitled',
  overview: clean(raw.Plot),
  poster: clean(raw.Poster),
  backdrop: null,
  year: toYear(raw.Year),
  rating: toNumber(raw.imdbRating),
  genres: toList(raw.Genre),
  runtime: toRuntime(raw.Runtime),
  rated: clean(raw.Rated),
  released: clean(raw.Released),
  actors: toList(raw.Actors),
})