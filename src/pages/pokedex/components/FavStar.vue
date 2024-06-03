<script setup lang="ts">
import favActive from '@/assets/icons/fav-active.svg'
import favInactive from '@/assets/icons/fav-inactive.svg'

defineProps<{ isFav: boolean }>()
defineEmits(['click'])
</script>

<template>
  <button @click.stop="$emit('click')">
    <img :src="isFav ? favActive : favInactive" alt="pokemon is or not favorite" />
  </button>
</template>
