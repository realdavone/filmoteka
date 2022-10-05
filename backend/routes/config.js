import express from 'express'
import auth from '../middleware/auth.js'

import GlobalSettings from '../schemas/GlobalSettings.js'
import Token from '../schemas/Token.js'
import { io } from '../io.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const globalSettings = await GlobalSettings.findOne({})
    const { _id, ...settings } = globalSettings._doc

    res.status(200).json({ success: true, settings })
  } catch (error) { res.sendStatus(500) }
})

router.put('/update', auth, async (req, res) => {
  const { isAdmin } = req.user
  if(!isAdmin) res.sendStatus(403)

  try {
    await GlobalSettings.findOneAndUpdate({}, req.body)

    io.emit('globalSettingsUpdate', req.body)

    res.status(200).json({ success: true })
  } catch (error) { res.statusCode(500) }
})

router.delete('/clear-tokens', auth, async (req, res) => {
  try {
    await Token.deleteMany({})
    res.status(200).json({ success: true, message: 'Všetky tokeny boli vymazané' })
  } catch (error) { res.statusCode(500) }
})

export default router