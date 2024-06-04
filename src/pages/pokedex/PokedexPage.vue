<script setup lang="ts">
import { Pokemon, PokemonListItem } from '@/modules/pokemon/domain/Pokemon'
import { onMounted, ref } from 'vue'
import { createApiPokemonRepository } from '@/modules/pokemon/infrastructure/ApiPokemonRepository'
import {
  addPokemonToFavs,
  getAllPokemon,
  removePokemonFromFavs,
  searchPokemon,
  getFavsPokemon,
  getPokemon,
  sharePokemon
} from '@/modules/pokemon/use-cases/pokemonUseCase'

// Components
import SearchInput from '@/components/ui/SearchInput.vue'
import Loader from '@/components/ui/Loader.vue'
import ListItems from './components/ListItems.vue'
import ListItemModal from './components/ListItemModal.vue'
import EmptyList from './components/EmptyList.vue'
import FilterToolbar, { FilterToolbarTabs } from './components/FilterToolbar.vue'

const repository = createApiPokemonRepository()

const isLoading = ref(true)

const pokemonList = ref<PokemonListItem[]>([])

const currentPokemon = ref<Pokemon | null>(null)

async function handleOnSearch(name: string) {
  try {
    let response: PokemonListItem[] = []
    if (name) {
      response = await searchPokemon(repository, name)
    } else {
      response = await getAllPokemon(repository)
    }

    pokemonList.value = response
  } catch (error) {
    console.log('error', error)
  }
}

function handleAddToFavs(name: string) {
  addPokemonToFavs(repository, name)
  for (const el of pokemonList.value) {
    if (el.name === name) {
      el.isFav = true
    }
  }
  if (currentPokemon.value && currentPokemon.value.name === name) {
    currentPokemon.value.isFav = true
  }
}

function handleRemoveFromFavs(name: string) {
  removePokemonFromFavs(repository, name)
  for (const el of pokemonList.value) {
    if (el.name === name) {
      el.isFav = false
    }
  }
  if (currentPokemon.value && currentPokemon.value.name === name) {
    currentPokemon.value.isFav = false
  }
}

async function handleOnFilterChange(event: FilterToolbarTabs) {
  if (event === FilterToolbarTabs.FAVORITES) {
    pokemonList.value = await getFavsPokemon(repository)
    return
  }

  pokemonList.value = await getAllPokemon(repository)
}

async function handleOnPokemonClick(name: string) {
  const response = await getPokemon(repository, name)
  currentPokemon.value = response
}

function handleOnClosePokemonModal() {
  currentPokemon.value = null
}

async function handleOnSharePokemon(pokemon: Pokemon) {
  await sharePokemon(repository, pokemon)
}

onMounted(async () => {
  try {
    pokemonList.value = await getAllPokemon(repository)
  } catch (error) {
    console.log('error', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="flex justify-center h-dvh">
    <Transition name="fade" mode="out-in">
      <Loader v-if="isLoading" />
    </Transition>

    <ListItemModal
      :item="currentPokemon"
      @close="handleOnClosePokemonModal"
      @copy="handleOnSharePokemon"
      @add-to-favs="handleAddToFavs"
      @remove-from-favs="handleRemoveFromFavs"
    />

    <div class="flex flex-col pt-9 pb-24 w-full px-7 md:px-0 md:w-[570px]">
      <SearchInput @search="handleOnSearch" />
      <EmptyList v-if="!Boolean(pokemonList.length)" />
      <template v-else>
        <section class="overflow-y-auto mt-4">
          <ListItems
            :items="pokemonList"
            @add-to-favs="handleAddToFavs"
            @remove-from-favs="handleRemoveFromFavs"
            @click="handleOnPokemonClick"
          />
        </section>
        <FilterToolbar @change="handleOnFilterChange" />
      </template>
    </div>
  </section>
</template>
