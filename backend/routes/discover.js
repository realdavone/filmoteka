import express from 'express'
import { discover } from '../controllers/discover.js'
import cache from '../middleware/cache.js'

const router = express.Router()

router.get('/:type', cache, discover)

export default router