import { Pokemon, PokemonListItem } from '../domain/Pokemon'

export function searchPokemonAdapter(body: any): PokemonListItem[] {
  return [
    {
      name: body.name,
      isFav: false
    }
  ]
}

export function getPokemonAdapter(body: any): Pokemon {
  return {
    name: body.name ?? undefined,
    isFav: false,
    height: body.height ?? undefined,
    weight: body.weight ?? undefined,
    types: body.types?.map((el: any) => el.type?.name ?? undefined),
    image: body.sprites?.other['official-artwork']['front_default']
  }
}

export function sharePokemonAdapter(pokemon: Pokemon): Partial<Pokemon> {
  return {
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    types: pokemon.types
  }
}
