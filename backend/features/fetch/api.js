import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY
const OMDB_API_KEY = process.env.OMDB_API_KEY

export async function getCollection(id) {
  try {
    const data = await fetch(`${process.env.TMDB_BASE_API}/collection/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=translations&language=sk-SK`)
    return await data.json()
  } catch (error) {
    return new Error(error)
  }
}

export async function getDiscoverResults(type, sort, page, genre) {
  try {
    const data = await fetch(`${TMDB_BASE_API}/discover/${type}?api_key=${TMDB_API_KEY}&language=sk-SK&sort_by=${sort}&page=${page}&with_genres=${genre}`)
    console.log(data)
    return await data.json()
  } catch (error) {
    return new Error(error)
  }
}

export async function getTMDBTitle(type, id) {
  try {
    const response = await fetch(`${TMDB_BASE_API}/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,recommendations,external_ids,translations,content_ratings&language=sk-SK`)
    return await response.json()
  } catch (error) {
    return new Error(error)
  }
}

export async function getOMDBTitle(imdb) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdb}&apikey=${OMDB_API_KEY}`)
    return await response.json()
  } catch (error) {
    return new Error(error)
  }
}

export async function getEpisodeData(id, season, episode) {
  try {
    const response = await fetch(`${TMDB_BASE_API}/tv/${id}/season/${season}/episode/${episode}?api_key=${TMDB_API_KEY}&language=sk-SK&append_to_response=translations`)
    return await response.json()
  } catch (error) {
    return new Error(error)
  }
}

export async function getVideoData(type, id) {
  try {
    const response = await fetch(`${TMDB_BASE_API}/${type}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`)
    return await response.json()
  } catch (error) {
    return new Error(error)
  }
}