import { createHttpError } from './httpError.js'

export const assertTitleId = (id) => {
  if (!/^tt\d{6,10}$/.test(String(id))) {
    throw createHttpError(400, 'Invalid title ID')
  }
}

export const parseSeason = (value) => {
  if (!/^\d{1,3}$/.test(String(value)) || Number(value) < 1) {
    throw createHttpError(400, 'Invalid season number')
  }
  return Number(value)
}