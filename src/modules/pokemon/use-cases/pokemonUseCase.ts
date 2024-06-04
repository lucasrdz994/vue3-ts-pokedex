import { AxiosError } from 'axios'
import { Pokemon, PokemonListItem } from '../domain/Pokemon'
import { PokemonRepository } from '../domain/PokemonRepository'

export async function getAllPokemon(pokemonRepository: PokemonRepository): Promise<PokemonListItem[]> {
  const pokemon = await pokemonRepository.getAll()

  const pokemonFavs = pokemonRepository.getFavs()

  return pokemon.map((el) => {
    return {
      ...el,
      isFav: pokemonFavs.includes(el.name)
    }
  })
}

export async function getFavsPokemon(pokemonRepository: PokemonRepository): Promise<PokemonListItem[]> {
  const pokemon = await pokemonRepository.getAll()

  const pokemonFavs = pokemonRepository.getFavs()

  return pokemon
    .map((el) => {
      return {
        ...el,
        isFav: pokemonFavs.includes(el.name)
      }
    })
    .filter((el) => el.isFav)
}

export async function searchPokemon(pokemonRepository: PokemonRepository, name: string): Promise<PokemonListItem[]> {
  try {
    const pokemon = await pokemonRepository.search(name.toLowerCase())

    const pokemonFavs = pokemonRepository.getFavs()

    return pokemon.map((el) => {
      return {
        ...el,
        isFav: pokemonFavs.includes(el.name)
      }
    })
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getPokemon(pokemonRepository: PokemonRepository, name: string): Promise<Pokemon> {
  const pokemon = await pokemonRepository.get(name.toLowerCase())

  const pokemonFavs = pokemonRepository.getFavs()

  pokemon.isFav = pokemonFavs.includes(pokemon.name)

  return pokemon
}

export async function addPokemonToFavs(pokemonRepository: PokemonRepository, name: string): Promise<void> {
  return pokemonRepository.addToFavs(name.toLowerCase())
}

export async function removePokemonFromFavs(pokemonRepository: PokemonRepository, name: string): Promise<void> {
  return pokemonRepository.removeFromFavs(name.toLowerCase())
}

export async function sharePokemon(pokemonRepository: PokemonRepository, pokemon: Pokemon): Promise<void> {
  return pokemonRepository.share(pokemon)
}
