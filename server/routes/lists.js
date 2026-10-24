import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getList } from '../services/lists.js'

const router = Router()

router.get(
  '/:name',
  asyncHandler(async (req, res) => {
    res.json(await getList(req.params.name, req.query.type))
  })
)

export default router