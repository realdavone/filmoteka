import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export const getCollection = async (req, res) => {
  const data = await fetch(`${process.env.TMDB_BASE_API}/collection/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=translations&language=sk-SK`)
  res.status(200).json(await data.json())
}