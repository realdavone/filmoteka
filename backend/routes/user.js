import express from 'express'
import auth from '../middleware/auth.js'
import { getAll, toggleAdmin, deleteUser, toggleVerified } from '../controllers/user.js'

const router = express.Router()

router.get('/all', auth, getAll)
router.patch('/toggle-admin', auth, toggleAdmin)
router.patch('/toggle-verified', auth, toggleVerified)
router.delete('/delete', auth, deleteUser)

export default router