import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getRelated } from '../services/lists.js'

const router = Router()

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { type, limit } = req.query
    res.json(await getRelated(req.params.id, { type, limit }))
  })
)

export default router