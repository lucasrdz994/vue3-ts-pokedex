<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import pikachu from '@/assets/pikachu.svg'
</script>

<template>
  <section class="grid place-items-center h-dvh">
    <div class="px-7 md:px-0 md:w-1/2 max-h-full flex flex-col items-center">
      <img class="mb-[60px]" :src="pikachu" alt="pikachu greeting" />
      <h1 class="font-bold text-center text-[1.444rem] mb-[30px]">Welcome to Pokedex</h1>
      <p class="mb-[50px] text-center">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
      </p>
      <Button to="/pokedex">Get started</Button>
    </div>
  </section>
</template>
