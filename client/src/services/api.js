export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const apiGet = async (path, signal) => {
  let response

  try {
    response = await fetch(`/api${path}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Cannot reach the server', 0)
  }

  const body = await response.json().catch(() => null)

  if (!response.ok) {
    const fallback =
      response.status >= 500 ? 'The server is unavailable' : 'Request failed'
    throw new ApiError(body?.error || fallback, response.status)
  }

  return body
}

const withQuery = (path, params = {}) => {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  })

  const text = query.toString()
  return text ? `${path}?${text}` : path
}

export const endpoints = {
  list: (name, params) => withQuery(`/lists/${encodeURIComponent(name)}`, params),
  genres: () => '/genres',
  genre: (slug, params) => withQuery(`/genres/${encodeURIComponent(slug)}`, params),
  movie: (id) => `/movies/${encodeURIComponent(id)}`,
  series: (id) => `/series/${encodeURIComponent(id)}`,
  season: (id, season) =>
    `/series/${encodeURIComponent(id)}/season/${encodeURIComponent(season)}`,
  search: (params) => withQuery('/search', params),
}