import express from 'express'
import auth from '../middleware/auth.js'

import { getComments, addComment, deleteComment } from '../controllers/comment.js'

const router = express.Router()

router.get('/:type/:id', getComments)
router.post('/add', auth, addComment)
router.delete('/', auth, deleteComment)

export default router