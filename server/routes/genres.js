import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getGenres, getGenre } from '../services/lists.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(getGenres())
})

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    res.json(await getGenre(req.params.slug, req.query.type))
  })
)

export default router