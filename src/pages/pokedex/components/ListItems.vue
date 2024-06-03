<script setup lang="ts">
import { PokemonListItem } from '@/modules/pokemon/domain/Pokemon'
import FavStar from '../components/FavStar.vue'

defineProps<{ items?: PokemonListItem[] }>()

const emit = defineEmits(['addToFavs', 'removeFromFavs', 'click'])

function handlePokemonFavsToggle(item: PokemonListItem) {
  if (item.isFav) {
    emit('removeFromFavs', item.name)
  } else {
    emit('addToFavs', item.name)
  }
}

function handleOnPokemonClick(name: string) {
  emit('click', name)
}
</script>

<template>
  <ul class="flex flex-col gap-y-3">
    <li v-for="item of items" :key="item.name" class="cursor-pointer" @click="handleOnPokemonClick(item.name)">
      <div class="flex justify-between px-4 bg-white">
        <h5 class="text-2xl h-[60px] flex items-center">{{ item.name }}</h5>
        <FavStar :is-fav="Boolean(item.isFav)" @click="handlePokemonFavsToggle(item)" />
      </div>
    </li>
  </ul>
</template>
