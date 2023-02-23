import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

export const getPerson = async (req, res) => {
  try {
    const data = await fetch(`${process.env.TMDB_BASE_API}/person/${req.params.id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=movie_credits,tv_credits,external_ids,translations,images&language=en-US`)
    res.json(await data.json())    
  } catch (error) {
    res.status(500).json({ success: false, message: 'Niečo sa pokazilo' })
  }
}