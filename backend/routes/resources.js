import express from 'express'
import { getCountryCodes, getGenre } from '../controllers/resources.js'

const router = express.Router()

router.get('/genre/:type', getGenre)
router.get('/country-codes/:code', getCountryCodes)

export default router