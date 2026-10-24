import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getMovie } from '../services/titles.js'

const router = Router()

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    res.json(await getMovie(req.params.id))
  })
)

export default router