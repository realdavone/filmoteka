import express from 'express'
import cache from '../middleware/cache.js'

import { getCollection } from '../controllers/collection.js'

const router = express.Router()

router.get('/:id', cache, getCollection)

export default router