import { Router } from 'express'
import asyncHandler from '../utils/asyncHandler.js'
import { getList } from '../services/lists.js'

const router = Router ()

router.get(
  '/:name',
  asyncHandler(async (req, res) => {
    const { type, limit} = req.query
    res.json(await getList(req.params.name, { type, limit}))
  })
)

export default router