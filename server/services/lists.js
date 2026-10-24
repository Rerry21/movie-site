import { LISTS, GENRES } from '../data/curatedLists.js'
import { getTitle } from './titles.js'
import { toCard } from '../utils/toCard.js'
import { createHttpError } from '../utils/httpError.js'

const BATCH_SIZE = 6
const missingIds = new Set()

const assertType = (type) => {
  if (type !== undefined && type !== 'movie' && type !== 'series') {
    throw createHttpError(400, 'Invalid type')
  }
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

const buildItems = async (ids, type) => {
  assertType(type)
  const titles = await loadTitles(ids)
  const filtered = type ? titles.filter((title) => title.type === type) : titles
  return filtered.map(toCard)
}

export const getList = async (name, type) => {
  if (!Object.hasOwn(LISTS, name)) {
    throw createHttpError(404, 'List not found')
  }
  const items = await buildItems(LISTS[name], type)
  return { name, items }
}

export const getGenres = () =>
  Object.entries(GENRES).map(([slug, genre]) => ({ slug, name: genre.name }))

export const getGenre = async (slug, type) => {
  const key = String(slug).toLowerCase()
  if (!Object.hasOwn(GENRES, key)) {
    throw createHttpError(404, 'Genre not found')
  }
  const genre = GENRES[key]
  const items = await buildItems(genre.ids, type)
  return { slug: key, name: genre.name, items }
}