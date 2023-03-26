import { getPopular, getTrending } from '../services/fetch/api.js'

export const trending = async (req, res) => {
  try {
    const data = await getTrending(req.params.timeWindow)
    res.status(200).json(data)    
  } catch (error) {
    res.sendStatus(500)
  }
}

export const popular = async (req, res) => {
  try {
    const data = await getPopular(req.params.type)
    res.status(200).json(data)
  } catch (error) {
    res.sendStatus(500)
  }
}