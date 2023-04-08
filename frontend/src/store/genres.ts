import { defineStore } from 'pinia'
import makeRequest from '../api/main'

interface Genres {
  movie: Map<number, { key: number, value: string }>
  tv: Map<number, { key: number, value: string }>
}

export const useGenresStore = defineStore('genresStore', () => {
  const genres: Genres = {
    movie: new Map(),
    tv: new Map()
  }

  async function setGenre(type: keyof typeof genres) {
    const data = await makeRequest<any>({ endpoint: `/resources/genre/${type}` })
    const genres = new Map()
    for(let genre of data.genres){
      genres.set(genre.id, genre.name)
    }
    return genres
  }

  (async () => {
    genres.movie = await setGenre('movie')
    genres.tv = await setGenre('tv')
  })()

  return {
    genres
  }
})