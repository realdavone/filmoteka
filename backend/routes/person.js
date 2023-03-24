import express from 'express'
import cache from '../middleware/cache.js'

import { getPerson } from '../controllers/person.js'

const router = express.Router()

router.get('/:id', cache, getPerson)

export default router