<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Pokemon, PokemonListItem } from '@/modules/pokemon/domain/Pokemon'
import PokemonBackground from '@/assets/pokemon-bg.jpg'
import closeIcon from '@/assets/icons/close.svg'

import FavStar from './FavStar.vue'
import Button from '@/components/ui/Button.vue'

defineProps<{ item: Pokemon | null }>()

const emit = defineEmits(['close', 'copy', 'removeFromFavs', 'addToFavs'])

const modalElement = ref<HTMLElement>()

onClickOutside(modalElement, () => {
  emit('close')
})

function handlePokemonFavsToggle(item: PokemonListItem) {
  if (item.isFav) {
    emit('removeFromFavs', item.name)
  } else {
    emit('addToFavs', item.name)
  }
}

function handleOnCloseModal() {
  emit('close')
}
</script>

<template>
  <section v-if="item">
    <div
      class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-slate-800/30 h-screen w-screen py-4"
    >
      <div
        ref="modalElement"
        class="relative flex flex-col justify-center mx-7 md:mx-0 md:w-[570px] rounded-md bg-white"
      >
        <button class="absolute right-3 top-3 z-10" @click="handleOnCloseModal">
          <img :src="closeIcon" alt="close icon" />
        </button>
        <div class="relative flex justify-center items-center h-[220px]">
          <img class="h-full max-w-full object-cover rounded-t-md" :src="PokemonBackground" alt="pokemon background" />
          <img class="absolute w-[180px]" :src="item.image" alt="pokemon image" />
        </div>
        <section class="py-5 px-7">
          <ul class="text-lg mb-5">
            <li class="py-3 border-b-2"><span class="font-bold">Name:</span> {{ item.name }}</li>
            <li class="py-3 border-b-2"><span class="font-bold">Weight:</span> {{ item.weight }}</li>
            <li class="py-3 border-b-2"><span class="font-bold">Height:</span> {{ item.height }}</li>
            <li class="py-3 border-b-2"><span class="font-bold">Types:</span> {{ item.types.join(', ') }}</li>
          </ul>
          <div class="flex justify-between">
            <Button @click="emit('copy', item)">Share to my friends</Button>
            <FavStar :is-fav="Boolean(item.isFav)" @click="handlePokemonFavsToggle(item)" />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
