import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY

export const discover = async (req, res) => {
  const { sort, page, genre } = req.query

  try {
    const data = await fetch(`${TMDB_BASE_API}/discover/${req.params.type}?api_key=${TMDB_API_KEY}&language=sk-SK&sort_by=${sort}&page=${page}&with_genres=${genre}`)
    res.status(200).json(await data.json())    
  } catch (error) {
    res.sendStatus(500)
  }
}