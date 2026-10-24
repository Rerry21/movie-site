import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { searchTitles } from '../services/search.js'

const router = Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { q, type, page } = req.query
    res.json(await searchTitles({ query: q, type, page }))
  })
)

export default router