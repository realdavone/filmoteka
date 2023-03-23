import express from 'express'
import auth from '../middleware/auth.js'
import requireAdmin from '../middleware/requireAdmin.js'

import { getConfig, updateConfig, deleteTokens } from '../controllers/config.js'

const router = express.Router()

router.get('/', getConfig)
router.put('/update', auth, requireAdmin, updateConfig)
router.delete('/tokens/clear', auth, requireAdmin, deleteTokens)

export default router