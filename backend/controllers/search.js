import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

export const search = async (req, res) => {
  const { query, page } = req.query
  const data = await fetch(`${process.env.TMDB_BASE_API}/search/${req.params.searchType}?api_key=${process.env.TMDB_API_KEY}&language=sk-SK&query=${query}&include_adult=false&page=${page}`)
  res.status(200).json(await data.json())
}