import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getSeries, getSeason } from '../services/titles.js'

const router = Router()

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    res.json(await getSeries(req.params.id))
  })
)

router.get(
  '/:id/season/:season',
  asyncHandler(async (req, res) => {
    res.json(await getSeason(req.params.id, req.params.season))
  })
)

export default router