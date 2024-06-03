<script setup lang="ts">
import loader from '@/assets/loader.svg'
</script>

<template>
  <section class="absolute grid place-items-center w-screen min-h-dvh bg-soft-gray z-10">
    <img :src="loader" alt="loading" class="spinner" />
  </section>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(180deg);
  }
  60% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

img.spinner {
  animation: spin 2.5s infinite;
  transform-origin: center;
}
</style>
