import { describe, it, expect, beforeAll } from 'vitest'
import { searchPokemon } from '../pokemonUseCase'
import { PokemonListItem } from '@/modules/pokemon/domain/Pokemon'
import { PokemonRepository } from '@/modules/pokemon/domain/PokemonRepository'
import { createApiPokemonRepository } from '../../infrastructure/ApiPokemonRepository'

let repository: PokemonRepository

beforeAll(() => {
  // Load repository
  repository = createApiPokemonRepository()
  // Setup favorites
  localStorage.setItem('pokemon-favs', JSON.stringify(['bulbasaur']))
})

describe('searchPokemon', () => {
  it('should return a list of searched Pokemon with favorite prop', async () => {
    const result = await searchPokemon(repository, 'bulbasaur')

    const expected: PokemonListItem[] = [{ name: 'bulbasaur', isFav: true }]

    expect(result).toEqual(expected)
  })

  it('should return an empty list if search returns a 404 error', async () => {
    const result = await searchPokemon(repository, 'Unknown')

    expect(result).toEqual([])
  })
})
