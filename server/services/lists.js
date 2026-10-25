import { LISTS, GENRES } from '../data/curatedLists.js'
import { getTitle } from './titles.js'
import { toCard } from '../utils/toCard.js'
import { createHttpError } from '../utils/httpError.js'

const BATCH_SIZE = 6
const BUFFER = 2
const MAX_LIMIT = 24
const missingIds = new Set()

const assertType = (type) => {
  if (type !== undefined && type !== 'movie' && type !== 'series') {
    throw createHttpError(400, 'Invalid type')
  }
}

const parseLimit = (value) => {
  if (value === undefined) return null
  const text = String(value)
  if (!/^\d{1,2}$/.test(text) || Number(text) < 1 || Number(text) > MAX_LIMIT) {
    throw createHttpError(400, 'Invalid limit')
  }
  return Number(text)
}

const loadTitles = async (ids) => {
  const wanted = ids.filter((id) => !missingIds.has(id))
  const titles = []
  let failure = null

  for (let start = 0; start < wanted.length; start += BATCH_SIZE) {
    const batch = wanted.slice(start, start + BATCH_SIZE)
    const results = await Promise.allSettled(batch.map((id) => getTitle(id)))

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        titles.push(result.value)
        return
      }
      if (result.reason?.status === 404) {
        missingIds.add(batch[index])
        console.warn(`Skipping ${batch[index]}: not found on OMDb`)
        return
      }
      failure = failure || result.reason
    })

    if (failure?.status === 429) break
  }

  if (titles.length === 0 && failure) throw failure
  return titles
}

const buildItems = async (ids, { type, limit }) => {
  assertType(type)
  const max = parseLimit(limit)
  const wanted = max ? ids.slice(0, max + BUFFER) : ids
  const titles = await loadTitles(wanted)
  const filtered = type ? titles.filter((title) => title.type === type) : titles
  const cards = filtered.map(toCard)
  return max ? cards.slice(0, max) : cards
}

export const getList = async (name, options = {}) => {
  if (!Object.hasOwn(LISTS, name)) {
    throw createHttpError(404, 'List not found')
  }
  const items = await buildItems(LISTS[name], options)
  return { name, items }
}

export const getGenres = () =>
  Object.entries(GENRES).map(([slug, genre]) => ({ slug, name: genre.name }))

export const getGenre = async (slug, options = {}) => {
  const key = String(slug).toLowerCase()
  if (!Object.hasOwn(GENRES, key)) {
    throw createHttpError(404, 'Genre not found')
  }
  const genre = GENRES[key]
  const items = await buildItems(genre.ids, options)
  return { slug: key, name: genre.name, items }
}