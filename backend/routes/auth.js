import express from 'express'

import { login, register, refreshToken, logout, googleAuth } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.post('/refresh', refreshToken)
router.post('/google', googleAuth)

export default router