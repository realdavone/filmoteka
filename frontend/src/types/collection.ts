import { TitleTranslation } from "./translations"

export type Collection = {
  id: number,
  name: string,
  overview: string,
  poster_path: string | null,
  backdrop_path: string | null,
  parts: [],
  translations: {
    translations: Array<TitleTranslation>
  }
}