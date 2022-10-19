import express from 'express'
import auth from '../middleware/auth.js'

import { getConfig, updateConfig, deleteTokens } from '../controllers/config.js'

const router = express.Router()

router.get('/', getConfig)
router.put('/update', auth, updateConfig)
router.delete('/clear-tokens', auth, deleteTokens)

export default router