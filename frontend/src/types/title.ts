export type FullMovieType = {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: Collection | null
  budget: number | null
  genres: Array<Genre>
  homepage: string
  id: string
  imdb_id: string | null
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Array<ProductionCompany>
  production_countries: Array<ProductionCountry>
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: Array<SpokenLanguage>
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled'
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: {
    cast: Array<CastMember>
    crew: Array<CrewMember>
  }
  translations: {
    translations: Array<MovieTitleTranslation>
  }
  external_ids: {
    imdb_id: string | null
    wikidata_id: string | null
    facebook_id : string | null
    instagram_id: string | null 
    twitter_id: string | null 
  }
  recommendations: {
    page: number
    results: Array<RecommendedMovie>
    total_pages: number
    total_results: number
  }
  omdb: OMDBMovieResponse
  _id: string
  savedTitle: string
  img: string
  isPlayerWorking: boolean
  __v: number
  dislikes?: Array<string>
  likes?: Array<string>
  isRecommended: boolean
}

export type FullTvTitleType = {
  backdrop_path: string | null
  created_by: Array<Creator>
  episode_run_time: Array<number>
  first_air_date: string
  genres: Array<Genre>
  external_ids: {
    imdb_id: string | null
    freebase_mid: string | null
    freebase_id: string | null
    tvdb_id: number | null
    tvrage_id: number | null
    wikidata_id: string | null
    facebook_id : string | null
    instagram_id: string | null 
    twitter_id: string | null 
  }
  homepage: string
  id: string
  in_production: boolean
  languages: Array<string>
  last_air_date: string
  last_episode_to_air: Episode
  name: string
  next_episode_to_air: Episode
  networks: Array<Network>
  number_of_episodes: number
  number_of_seasons: number
  origin_country: Array<string>
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Array<ProductionCompany>
  production_countries: Array<ProductionCountry>
  seasons: Array<Season>
  spoken_languages: Array<SpokenLanguage>
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
  translations:{ 
    translations: Array<TvTitleTranslation>
  }
  credits: {
    cast: Array<CastMember>
    crew: Array<CrewMember>
  }
  recommendations: {
    page: number
    results: Array<RecommendedTv>
    total_pages: number
    total_results: number
  }
  omdb: OMDBTvResponse,
  _id: string
  savedTitle: string
  img: string
  isPlayerWorking: boolean
  __v: number
  dislikes?: Array<string>
  likes?: Array<string>
  isRecommended: boolean
}

type RecommendedTv = {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: Array<number>
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: Array<string>
}

type RecommendedMovie = {
  adult: boolean,
  backdrop_path: string,
  id: number,
  title: string,
  original_language: string,
  original_title: string,
  overview: string,
  poster_path: string,
  media_type: string,
  genre_ids: Array<number>,
  popularity: number,
  release_date: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

type OMDBBase = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: [
    {
      Source: string
      Value: string
    }
  ],
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  Response: string
}

type OMDBMovieResponse = OMDBBase & {
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}
type OMDBTvResponse = OMDBBase & { totalSeasons: string }

type Season = {  
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

type CastMember = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  credit_id: string
  order: number
}

type CrewMember = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

type Network = {
  name: string
  id: number
  logo_path: string | null
  origin_country: string
}

type Episode = {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string | null
  vote_average: number
  vote_count: number
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type ProductionCompany = {
  id: number
  logo_path: null | string
  name: string
  origin_country: string
}

type Collection = {
  id: number
  name: string
  poster_path: string,
  backdrop_path: string
}

type Genre = {
  id: number
  name: string
}

export type Creator = {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string | null
}

export type MovieTitleTranslation = {
  iso_3166_1: string,
  iso_639_1: string,
  name: string,
  english_name: string,
  data: {
    homepage: string,
    overview: string,
    runtime: number,
    tagline: string,
    title: string
  }
}

export type TvTitleTranslation = {
  iso_3166_1: string
  iso_639_1: string
  name: string
  english_name: string
  data: {
    name: string
    overview: string
    homepage: string
    tagline: string
  }
}

interface BaseTitle {
  poster_path: string | null
  adult: boolean
  overview: string
  genre_ids: number[]
  id: number
  original_language: string
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TvTitle extends BaseTitle {
  media_type: 'tv'
  name: string
  original_name: string
  first_air_date: string
}

export interface MovieTitle extends BaseTitle {
  media_type: 'movie'
  title: string
  original_title: string
  release_date: string
}

export type TitleFromDB = {
  dislikes: string[]
  id: string
  img: string
  isPlayerWorking: boolean
  likes: string[]
  savedTitle: string
  type: 'movie' | 'tv'
  __v: string
  _id: string
}

export type Title = TvTitle | MovieTitle

export type RecommendedTitle = {
  _id: string
  title: TitleFromDB
  createdAt: string
  __v: string
}