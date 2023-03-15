import dotenv from 'dotenv'
import fetch from 'node-fetch'

import Genres from '../schemas/Genres.js'
import CountryCodes from '../schemas/CountryCodes.js'

dotenv.config()

const TMDB_BASE_API = process.env.TMDB_BASE_API
const TMDB_API_KEY = process.env.TMDB_API_KEY

export const getGenre = async (req, res) => {
  const genre = await Genres.findOne({ name: req.params.type })
  if(genre !== null) return res.status(200).json(genre)

  try {
    const response = await fetch(`${TMDB_BASE_API}/genre/${req.params.type}/list?api_key=${TMDB_API_KEY}&language=sk-SK`)
    const data = await response.json()

    const newGenre = await Genres.create({ name: req.params.type, genres: await data.genres })
    res.status(200).json(newGenre)    
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getCountryCodes = async (req, res) => {
  const countryCode = await CountryCodes.findOne({ code: req.params.code })
  if(countryCode !== null) return res.status(200).json(countryCode)

  try {
    const response = await fetch(`https://flagcdn.com/${req.params.code}/codes.json`)
    const data = await response.json()

    const countryCodes = await CountryCodes.create({ code: req.params.code, codes: data })
    res.status(200).json(countryCodes)    
  } catch (error) {
    res.sendStatus(500)
  }
}