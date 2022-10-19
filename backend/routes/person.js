import express from 'express'

import { getPerson } from '../controllers/person.js'

const router = express.Router()

router.get('/:id', getPerson)

export default router