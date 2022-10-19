import express from 'express'
import auth from '../middleware/auth.js'
import { getAll, toggleAdmin, deleteUser } from '../controllers/user.js'

const router = express.Router()

router.get('/all', auth, getAll)
router.patch('/toggleadmin', auth, toggleAdmin)
router.delete('/delete', auth, deleteUser)

export default router