import getData from '../api/main.js'

export default {
  async getCountries(code){
    const data = await getData({ endpoint: `/country-codes/${code}` })
    return data.codes
  },
  async getGenres(keyword){
    const data = await getData({ endpoint: `/resources/genre/${keyword}` })
    const genres = new Map()
    for(let genre of data.genres){
      genres.set(genre.id, genre.name)
    }
    return genres
  },
  makeUnscrollable(element, arg){ element.classList.toggle('modal-open', arg) },
  getTranslations(translations){
    return translations
    .filter(translation => translation['iso_639_1'] === 'en' || translation['iso_639_1'] === 'sk' || translation['iso_639_1'] === 'cs')
    .filter(translation => translation['data']['overview'] !== '')
    .sort((a, b) => a['iso_639_1'] === 'sk' ? -1 : b['iso_639_1'] === 'sk' ? 1 : 0)
    .shift()
  },
  sortCreators(creators){
    if(!Array.isArray(creators)) return []
    
    let arr = []
    creators.forEach(creator => {
      let indexOfItem = arr.findIndex(element => element.id === creator.id)
      if(indexOfItem === -1) arr.push({ id: creator['id'], name: creator['name'], jobs: [creator['job']], photo: creator['profile_path'] })
      else arr[indexOfItem]['jobs'].push(creator['job'])
    })
    return arr
  },
  initLoader(){
    const logo = document.createElement('img')
    const loaderHolder = document.createElement('section')
    const text = document.createElement('span')
    text.innerText = 'Spúšťa sa server'

    logo.setAttribute('src', '/icon.svg')
    logo.setAttribute('width', '75')
    logo.setAttribute('alt', 'Logo')

    loaderHolder.setAttribute('class', 'loader-holder')
    loaderHolder.appendChild(logo)
    loaderHolder.appendChild(text)
    
    document.getElementById('app').appendChild(loaderHolder)
  }
}