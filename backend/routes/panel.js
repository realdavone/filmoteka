import express from 'express'
import { trending, popular } from '../controllers/panel.js'

const router = express.Router()

router.get('/trending/:timeWindow', trending)
router.get('/popular/:type', popular)

export default router