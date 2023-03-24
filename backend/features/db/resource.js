import CountryCodes from "../../schemas/CountryCodes.js"
import Genres from "../../schemas/Genres.js"

export async function getGenreFromDB(options) {
  return await Genres.findOne(options)
}

export async function createGenreInDB(options) {
  return await Genres.create(options)
}

export async function getCountryCodesFromDB(options) {
  return await CountryCodes.findOne(options)
}

export async function createCountryCodesInDB(options) {
  return await CountryCodes.create(options)
}