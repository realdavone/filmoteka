import getData from '../api/main.js'

export default {
  async getCountries(code: string){
    const data = await getData<any>({ endpoint: `/country-codes/${code}` })
    return data.codes
  },
  async getGenres(keyword: 'movie' | 'tv'){
    const data = await getData<any>({ endpoint: `/resources/genre/${keyword}` })
    const genres = new Map()
    for(let genre of data.genres){
      genres.set(genre.id, genre.name)
    }
    return genres
  },
  makeUnscrollable(element: HTMLElement, arg: any){ element.classList.toggle('modal-open', arg) },
  getTranslations<T extends { data: { overview: string } }>(translations: Array<T>, key: keyof T, codes: Array<string>): T{
    return translations
      .filter(translation => codes.includes(translation[key] as string))
      .filter(translation => translation.data.overview !== '')
      .sort((a, b) => a[key] === codes[0] ? -1 : b[key] === codes[0] ? 1 : 0)[0]
  },
  sortCreators<T>(creators: Array<any>): Array<T>{    
    let arr: any[] = []

    creators.forEach(creator => {
      let indexOfItem = arr.findIndex(element => element.id === creator.id)
      if(indexOfItem === -1) arr.push({
        id: creator['id'],
        name: creator['name'],
        jobs: [creator['job']],
        profile_path: creator['profile_path']
      })
      else arr[indexOfItem]['jobs'].push(creator['job'])
    })
    
    return arr
  },
  initLoader(){
    document.getElementById('app')!.innerHTML = ''

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
    
    document.getElementById('app')!.appendChild(loaderHolder)
  },
  setFailedScreen(error: string, retry: () => void){
    document.getElementById('app')!.innerHTML = ''

    const loaderHolder = document.createElement('section')
    const text = document.createElement('span')
    const button = document.createElement('button')

    text.innerText = error
    button.innerText = 'Skúsiť znova'

    loaderHolder.setAttribute('class', 'failed-holder')
    loaderHolder.appendChild(text)

    button.onclick = () => retry()
    button.setAttribute('class', 'retry-app-button')
    
    document.getElementById('app')!.appendChild(loaderHolder).appendChild(button)
  }
}