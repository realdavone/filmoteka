import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY

export const trending = async (req, res) => {
  try {
    const data = await fetch(`${TMDB_BASE_API}/trending/all/${req.params.timeWindow}?api_key=${TMDB_API_KEY}&language=sk-SK`)
    res.status(200).json(await data.json())    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Niečo sa pokazilo' })
  }
}

export const popular = async (req, res) => {
  try {
    const data = await fetch(`${TMDB_BASE_API}/${req.params.type}/popular?api_key=${TMDB_API_KEY}&language=sk-SK`)
    res.status(200).json(await data.json())    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Niečo sa pokazilo' })
  }
}