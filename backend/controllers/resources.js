import { createGenreInDB, getGenreFromDB, getCountryCodesFromDB, createCountryCodesInDB } from '../services/db/resource.js'
import { fetchCountryCodesFromCDN, getGenresFromTMDB } from '../services/fetch/api.js'

export const getGenre = async (req, res) => {
  const genre = await getGenreFromDB({ name: req.params.type })
  
  if(genre)
    return res.status(200).json(genre)

  try {
    const data = await getGenresFromTMDB(req.params.type)

    const newGenre = await createGenreInDB({ name: req.params.type, genres: data.genres })
    res.status(200).json(newGenre)    
  } catch (error) {
    res.sendStatus(500)
  }
}

export const getCountryCodes = async (req, res) => {
  const countryCode = await getCountryCodesFromDB({ code: req.params.code })

  if(countryCode)
    return res.status(200).json(countryCode)

  try {
    const codes = await fetchCountryCodesFromCDN(req.params.code)

    const countryCodes = await createCountryCodesInDB({ code: req.params.code, codes })
    res.status(200).json(countryCodes)
  } catch (error) {
    res.sendStatus(500)
  }
}