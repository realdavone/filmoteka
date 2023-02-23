import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export const getCollection = async (req, res) => {
  try {
    const data = await fetch(`${process.env.TMDB_BASE_API}/collection/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=translations&language=sk-SK`)
    res.status(200).json(await data.json())    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Niečo sa pokazilo' })
  }
}