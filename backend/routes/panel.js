import express from 'express'
import { trending, popular } from '../controllers/panel.js'
import cache from '../middleware/cache.js'

const router = express.Router()

router.get('/trending/:timeWindow', cache, trending)
router.get('/popular/:type', cache, popular)

export default router