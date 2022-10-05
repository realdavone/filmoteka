import getData from '../api/main.js'

export default {
  async getCountries(code){
    const data = await getData({ endpoint: `/country-codes/${code}` })
    return data.codes
  },
  async getGenres(keyword){
    const data = await getData({ endpoint: `/genres/${keyword}` })
    const genres = new Map()
    for(let genre of data.genres){
      genres.set(genre.id, genre.name)
    }
    return genres
  },
  makeUnscrollable(element, arg){ element.classList.toggle('modal-open', arg) },
  getTranslations(translations){
    const trans = translations.filter(
      element => element['iso_639_1'] === 'en' || element['iso_639_1'] === 'sk' || element['iso_639_1'] === 'cs'
    ).filter(
      element => element['data']['overview'] !== ''
    ).sort((a, b) => { return a['iso_639_1'] === 'sk' ? -1 : b['iso_639_1'] === 'sk' ? 1 : 0})
    return trans
  },
  sortCreators(creators){
    if(Array.isArray(creators) === false) return []
    
    let arr = []
    creators.forEach(creator => {
      let indexOfItem = arr.findIndex(element => element.id === creator.id)
      if(indexOfItem === -1) arr.push({ id: creator['id'], name: creator['name'], jobs: [creator['job']], photo: creator['profile_path'] })
      else arr[indexOfItem]['jobs'].push(creator['job'])
    })
    return arr
  }
}