import express from 'express'
import auth from '../middleware/auth.js'
import { getAll, toggleAdmin, deleteUser, toggleVerified } from '../controllers/user.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = express.Router()

router.get('/all', auth, requireAdmin, getAll)
router.patch('/roles/admin/toggle', auth, requireAdmin, toggleAdmin)
router.patch('/verified/toggle', auth, requireAdmin, toggleVerified)
router.delete('/delete', auth, requireAdmin, deleteUser)

export default router