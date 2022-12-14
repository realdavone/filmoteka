import { Title } from './title'

export type MovieCastItem = {
  character: string
  credit_id: string
  release_date: string
  vote_count: number
  video: boolean
  adult: boolean
  vote_average: number
  title: string
  genre_ids: Array<number>
  original_language: string
  original_title: string
  popularity: number
  id: number
  backdrop_path: string | null
  overview: string
  poster_path: string | null
}

export type MovieCrewItem = {
  id: number
  department: string
  original_language: string
  original_title: string
  job: string
  overview: string
  vote_count: number
  video: boolean
  poster_path: string | null
  backdrop_path: string | null
  title: string
  popularity: number
  genre_ids: Array<number>
  vote_average: number
  adult: boolean
  release_date: string
  credit_id: string
}

export type TvCastItem = {
  credit_id: string
  original_name: string
  id: number
  genre_ids:Array<number>
  character: string
  name: string
  poster_path: string | null
  vote_count: number
  vote_average: number
  popularity: number
  episode_count: number
  original_language: string
  first_air_date: string
  backdrop_path: string | null
  overview: string
  origin_country:Array<string>
}

export type TvCrewItem = {
  id: number
  department: string
  original_language: string
  episode_count: number
  job: string
  overview: string
  origin_country: Array<string>
  original_name: string
  genre_ids: Array<number>
  name: string
  first_air_date: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  vote_average: number
  poster_path: string | null
  credit_id: string
}

export type Translation = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  data: {
    biography: string
  }
  biography: string
  english_name: string
}

export type Person = {
  birthday: string | null
  known_for_department: string
  deathday: null | string
  id: number
  name: string
  also_known_as: string[]
  gender: number
  biography: string
  popularity: number
  place_of_birth: string | null
  profile_path: string | null
  adult: boolean
  imdb_id: string
  homepage: null | string
  external_ids: {
    facebook_id: null | string
    freebase_id: null | string
    freebase_mid: null | string
    imdb_id: null | string
    instagram_id: null | string
    tvrage_id: null | string
    twitter_id: null | string
    wikidata_id: null | string
  }
  translations: {
    translations: Translation
  }
  movie_credits: {
    cast: Array<MovieCastItem> 
    crew: Array<MovieCrewItem>
  }
  tv_credits: {
    cast: Array<TvCastItem>
    crew: Array<TvCrewItem>
  }
}

export type PersonSearchType = Pick<Person, 'profile_path' | 'adult' | 'id' | 'name' | 'popularity'> & { known_for: Title[], media_type: 'person' }