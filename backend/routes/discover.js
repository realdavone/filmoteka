import express from 'express'
import { discover } from '../controllers/discover.js'

const router = express.Router()

router.get('/:type', discover)

export default router