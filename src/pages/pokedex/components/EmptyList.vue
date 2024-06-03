<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <section class="flex flex-col items-center p-12">
    <h3 class="text-4xl font-bold mb-3">Uh-oh!</h3>
    <p class="text-xl mb-6">You look lost on your journey!</p>

    <Button to="/">Go back home</Button>
  </section>
</template>
