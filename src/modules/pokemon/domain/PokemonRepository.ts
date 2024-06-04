import { Pokemon, PokemonFavs, PokemonListItem } from './Pokemon'

export interface PokemonRepository {
  getAll: () => Promise<PokemonListItem[]>
  search: (name: string) => Promise<PokemonListItem[]>
  get: (name: string) => Promise<Pokemon>
  getFavs: () => PokemonFavs
  addToFavs: (name: string) => void
  removeFromFavs: (name: string) => void
  share: (pokemon: Pokemon) => Promise<void>
}
