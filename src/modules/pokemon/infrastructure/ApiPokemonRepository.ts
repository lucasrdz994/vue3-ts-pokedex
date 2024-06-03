import axios from 'axios'

import { PokemonRepository } from '../domain/PokemonRepository'
import { getPokemonAdapter, searchPokemonAdapter } from '../adapters/pokemonAdapters'

const apiUrl = 'https://pokeapi.co/api/v2'

export function createApiPokemonRepository(): PokemonRepository {
  return {
    getAll,
    get,
    search,
    getFavs,
    addToFavs,
    removeFromFavs
  }
}

async function get(name: string) {
  const endpoint = apiUrl + `/pokemon/${name}`

  const response = await axios.get(endpoint)

  const data = getPokemonAdapter(response.data)

  return data
}

async function getAll() {
  const endpoint = apiUrl + '/pokemon'

  const response = await axios.get(endpoint)

  return response.data.results
}

async function search(name: string) {
  const endpoint = apiUrl + `/pokemon/${name}`

  const response = await axios.get(endpoint)

  const data = searchPokemonAdapter(response.data)

  return data
}

function getFavs() {
  const pokemons = localStorage.getItem('pokemon-favs')

  if (pokemons === null) {
    return []
  }

  return JSON.parse(pokemons) as string[]
}

function addToFavs(name: string) {
  const pokemon = getFavs()

  pokemon.push(name)

  localStorage.setItem('pokemon-favs', JSON.stringify(pokemon))
}

function removeFromFavs(name: string) {
  let pokemon = getFavs()

  pokemon = pokemon.filter((el) => el !== name)

  localStorage.setItem('pokemon-favs', JSON.stringify(pokemon))
}
