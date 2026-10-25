const KEY = 'reelio:watchlist'
const listeners = new Set()

const read = () => {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (entry) => entry && entry.id && entry.type && entry.title
    )
  } catch {
    return []
  }
}

let items = read()

const notify = () => {
  listeners.forEach((listener) => listener())
}

const persist = (next) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
    return true
  } catch {
    return false
  }
}

const write = (next) => {
  items = next
  persist(next)
  notify()
}

window.addEventListener('storage', (event) => {
  if (event.key === KEY || event.key === null) {
    items = read()
    notify()
  }
})

const toEntry = (title) => ({
  id: title.id,
  type: title.type,
  title: title.title,
  poster: title.poster || null,
  year: title.year || null,
  rating: typeof title.rating === 'number' ? title.rating : null,
  genres: Array.isArray(title.genres) ? title.genres.slice(0, 3) : [],
  addedAt: Date.now(),
})

export const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getSnapshot = () => items

export const isInWatchlist = (id) => items.some((entry) => entry.id === id)

export const addToWatchlist = (title) => {
  if (isInWatchlist(title.id)) return
  write([toEntry(title), ...items])
}

export const removeFromWatchlist = (id) => {
  write(items.filter((entry) => entry.id !== id))
}

export const clearWatchlist = () => {
  write([])
}