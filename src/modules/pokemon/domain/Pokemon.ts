export interface PokemonListItem {
  name: string
  isFav?: boolean
}

export interface Pokemon {
  name: string
  image?: string
  weight?: number
  height?: number
  types: string[]
  isFav: boolean
}

export type PokemonFavs = string[]
