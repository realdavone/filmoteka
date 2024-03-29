import express from 'express'
import auth from '../middleware/auth.js'
import { getTitle, getRecommended, toggleNonWorkingTitle, removeRecommendedTitle, addRecommendedTitle, getEpisode, getVideo, rateTitle, getMostLiked } from '../controllers/title.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = express.Router()

router.get('/find/:type/:id', getTitle)
router.get('/recommended', getRecommended)
router.post('/non-working', auth, toggleNonWorkingTitle)
router.post('/recommend', auth, addRecommendedTitle)
router.delete('/recommend', auth, requireAdmin, removeRecommendedTitle)
router.get('/episode/:id/:season/:episode', getEpisode)
router.get('/video/:type/:id', getVideo)
router.patch('/rate', auth, rateTitle)
router.get('/most-liked', getMostLiked)

export default router