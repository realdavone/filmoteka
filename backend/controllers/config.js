import { io } from '../io.js'
import { getGlobalSettings, updateGlobalSettings } from '../services/db/config.js'
import { removeAllTokensFromDB } from '../services/db/token.js'

export const getConfig = async (req, res) => {
  try {
    const settings = await getGlobalSettings()

    res.status(200).json({ success: true, settings })
  } catch (error) { res.sendStatus(500) }
}

export const updateConfig = async (req, res) => {
  try {
    await updateGlobalSettings(req.body)

    io.emit('globalSettingsUpdate', req.body)

    res.status(200).json({ success: true })
  } catch (error) { res.sendStatus(500) }
}

export const deleteTokens = async (req, res) => {
  try {
    await removeAllTokensFromDB()
    res.status(200).json({ success: true, message: 'Všetky tokeny boli vymazané' })
  } catch (error) { res.sendStatus(500) }
}