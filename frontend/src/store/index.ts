import _ from '../utils/main'
import { reactive } from 'vue'
import { notify } from "@kyvg/vue3-notification"
const baseURL = import.meta.env.VITE_BASE_URL

type FavouriteItem = {
  id: string
  img: string
  title: string
  type: 'Movie' | 'Tv' 
  episode?: number
  season?: number
}

type WatchedItem = Omit<FavouriteItem, 'img'>

type RecentItem = {
  id: number 
  poster: string
  title: string
  type: 'Movie' | 'Tv' 
}

type LocalSettings = {
  darkTheme: boolean
  pinnedPlayer: boolean
  themeColors: {
    colors: Array<string>
    mainColor: null | string 
  }
}

type Notifications= {
  recommended: Array<any>
}

export interface User {
  _id: string
  email: string
  isAdmin: boolean
  isVerified: boolean
}

interface Credentials {
  user: null | User
  accessToken: null | string
  loggedIn: boolean
}

interface GlobalSettings {
  allowRegistration: boolean
  allowWatchWhileUnregistered: boolean
}

export interface GlobalState {
  favourites: Array<FavouriteItem>
  watched: Array<WatchedItem>
  countries: Map<string, string>
  genres: {
    movie: Map<number, { key: number, value: string }>
    tv: Map<number, { key: number, value: string }>
  }
  recentSearch: Array<string>
  recentItems: Array<RecentItem>
  settings: LocalSettings
  notifications: Notifications
  credentials: Credentials
  globalSettings: null | GlobalSettings
}

const methods = {
  favourites: {
    populate(){
      if(localStorage.getItem('favourites') === null) return []

      try { return JSON.parse(localStorage.favourites) }
      catch (error) { return [] }
    },
    toggle({ id, type, title, img }: FavouriteItem){
      const doesExist = methods.favourites.exists({ type, id })

      if(doesExist) state.favourites = state.favourites.filter(title => title.id !== id)
      else state.favourites.push({ id, type, title, img })
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
      notify({ type: doesExist === false ? 'success' : 'warn', text: doesExist === false ? 'Pridané do záložiek' : 'Odobrané zo záložiek' })
    },
    update(id: string, season: number, episode: number){
      state.favourites = state.favourites.map(title => {
        if(title.id === id && title.type === 'Tv') return { ...title, episode, season }
        return title
      })
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },
    removeAll(){
      state.favourites = []
      localStorage.setItem('favourites', JSON.stringify(state.favourites))
    },
    exists(title: Pick<FavouriteItem, 'type' | 'id'>){ return state.favourites.some(item => item['type'] === title.type && item['id'] === title.id) }
  },
  watched: {
    populate(){
      if(localStorage.getItem('watched') !== null) {
        try { return JSON.parse(localStorage.watched) }
        catch (error) { return [] }
      }
      else return []
    },
    toggle({ id, type, title }: WatchedItem){
      const doesExist = methods.watched.exists({ type, id })

      if(doesExist) state.watched = state.watched.filter(title => title.id !== id)
      else state.watched.push({ id, type, title })
      localStorage.setItem('watched', JSON.stringify(state.watched))
      notify({ type: doesExist === false ? 'success' : 'warn', text: doesExist === false ? 'Označený ako prezrený' : 'Označený ako neprezrený' })
    },
    exists({ type, id }: Omit<WatchedItem, 'title'>){ 
      return state.watched.some(item => item['type'].toLowerCase() === type?.toLowerCase() && item['id'].toString() === id?.toString())
    }
  },
  countries: {
    async set(code: string){ 
      const res = await fetch(`${baseURL}/resources/country-codes/${code}`)
      const data = await res.json()
      state.countries = data.codes
    }
  },
  genres: {
    async set(keyword: 'movie' | 'tv'){ state.genres[keyword] = await _.getGenres(keyword) }
  },
  recentSearch: {
    populate(){
      if(localStorage.getItem('recentSearch') !== null)
        try { return JSON.parse(localStorage.recentSearch) } 
        catch (error) { return [] }
      else return []
    },
    pushItem(item: string){
      if(state.recentSearch.indexOf(item) !== -1){
        state.recentSearch.splice(state.recentSearch.indexOf(item), 1)
      }
      state.recentSearch.unshift(item)
      if(state.recentSearch.length > 6){
        state.recentSearch = state.recentSearch.splice(0,6)
      }
      localStorage.setItem('recentSearch', JSON.stringify(state.recentSearch))
    },
    removeItem(item: string){
      state.recentSearch = state.recentSearch.filter(recentItem => recentItem !== item)
      localStorage.setItem('recentSearch', JSON.stringify(state.recentSearch))
    },
    clear(){
      state.recentSearch = []
      localStorage.removeItem('recentSearch')
    }
  },
  recentItems: {
    populate() {
      if(localStorage.getItem('recentItems') !== null)
        try { return JSON.parse(localStorage.recentItems) } 
        catch (error) { return [] }
      else return []
    },
    pushItem(item: RecentItem){
      if(state.recentItems.some(title => title.id === item.id)){
        state.recentItems.splice(state.recentItems.findIndex(title => title.id === item.id && title.type === item.type), 1)
      }
      state.recentItems.unshift(item)
      if(state.recentItems.length > 10){
        state.recentItems=state.recentItems.splice(0, 10)
      }
      localStorage.setItem('recentItems', JSON.stringify(state.recentItems))
    },
    clear(){
      state.recentItems = []
      localStorage.removeItem('recentItems')
    }
  },
  settings: {
    pinnedPlayerToggle(){
      state.settings.pinnedPlayer =! state.settings.pinnedPlayer
      localStorage.setItem('pinnedPlayer', JSON.stringify(state.settings.pinnedPlayer))
      notify({ type: 'warn', text: state.settings.pinnedPlayer ? 'Prehraváč bol pripnutý' : 'Prehraváč bol odopnutý' })
    },
    themeColor: {
      set(color: string){
        state.settings.themeColors.mainColor = color

        const root = document.querySelector(':root') as HTMLElement
        root.style.setProperty('--theme-color', state.settings.themeColors.mainColor)
        root.style.setProperty('--theme-color-transparent', state.settings.themeColors.mainColor+'90')
        localStorage.setItem('themeColor', state.settings.themeColors.mainColor)
      },
      get(){ return state.settings.themeColors.mainColor }
    },
    darkTheme: {
      set(isDark: 'true' | 'false'){
        const isDarkTheme = JSON.parse(isDark)
        state.settings.darkTheme = isDarkTheme
        document.body.setAttribute('data-dark-theme', isDarkTheme)
        localStorage.setItem('darkTheme', JSON.stringify(state.settings.darkTheme))
      },
      get(){ return state.settings.darkTheme }
    }
  },
  notifications: {
    recommended: {
      add(title: any) { state.notifications.recommended.push(title) },
      reset() { state.notifications.recommended = [] }
    }
  },
  credentials: {
    set(user: User, accessToken: string) { 
      state.credentials.user = user
      state.credentials.accessToken = accessToken
      state.credentials.loggedIn = true
    },
    clear() {
      state.credentials.user = null
      state.credentials.accessToken = null
      state.credentials.loggedIn = false
      localStorage.removeItem('refreshToken')
    }
  },
  globalSettings: {
    init() {
      return new Promise((resolve, reject) => {        
        fetch(`${baseURL}/config`).then(res => res.json())
        .then(data => resolve(data.settings))
        .catch(() => reject('Služba nie je dostupná. Skúste neskôr.'))
      })
    }
  }
}

const state = reactive<GlobalState>({
  favourites: methods.favourites.populate(),
  watched: methods.watched.populate(),
  countries: new Map(),
  genres: {
    movie: new Map(),
    tv: new Map()
  },
  recentSearch: methods.recentSearch.populate(),
  recentItems: methods.recentItems.populate(),
  settings: {
    pinnedPlayer: localStorage.getItem('pinnedPlayer') !== null ? JSON.parse(localStorage.getItem('pinnedPlayer') as string) : false,
    themeColors: {
      colors: ['#ED3F00','#F78764','#2176AE','#FBB13C','#008080','#89BD9E','#B84A62'],
      mainColor: null
    },
    darkTheme: true
  },
  notifications: { 
    recommended: [] 
  },
  credentials: {
    user: null,
    accessToken: null,
    loggedIn: false
  },
  globalSettings: null
})

const initResources = (): void => {
  //methods.countries.set('sk')
  methods.genres.set('movie')
  methods.genres.set('tv')
}

methods.settings.themeColor.set(localStorage.getItem('themeColor') || state.settings.themeColors.colors[0])
methods.settings.darkTheme.set(localStorage.getItem('darkTheme') as 'true' | 'false' || true)

export default { state, methods, initResources }