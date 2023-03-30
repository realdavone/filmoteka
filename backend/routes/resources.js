import express from 'express'
import { getCountryCodes, getGenre } from '../controllers/resources.js'
import cache from '../middleware/cache.js'

const router = express.Router()

router.get('/genre/:type', cache, getGenre)
router.get('/country-codes/:code', cache, getCountryCodes)

export default router