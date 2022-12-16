import { TitleTranslation } from "./translations"

type CollectionTitle = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: Array<number>
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Collection = {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  parts: Array<CollectionTitle>
  translations: {
    translations: Array<TitleTranslation>
  }
}