import express from 'express'
import { search } from '../controllers/search.js'
import cache from '../middleware/cache.js'

const router = express.Router()

router.get('/:searchType', cache, search)

export default router