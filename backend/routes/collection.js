import express from 'express'

import { getCollection } from '../controllers/collection.js'

const router = express.Router()

router.get('/:id', getCollection)

export default router