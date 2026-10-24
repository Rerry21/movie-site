import NodeCache from 'node-cache'

const cache = new NodeCache({ checkperiod: 120, useClones: false })
const pending = new Map()

export const TTL = {
  details: 60 * 60 * 24,
  season: 60 * 60 * 12,
  search: 60 * 60,
}

export const cached = async (key, ttl, loader) => {
  const hit = cache.get(key)
  if (hit !== undefined) return hit

  if (pending.has(key)) return pending.get(key)

  const promise = loader()
    .then((value) => {
      cache.set(key, value, ttl)
      return value
    })
    .finally(() => {
      pending.delete(key)
    })

  pending.set(key, promise)
  return promise
}