<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg'

withDefaults(defineProps<{ modelValue?: string; placeholder?: string }>(), {
  modelValue: '',
  placeholder: 'Search'
})

const emit = defineEmits(['search'])

function handleOnSearch(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('search', (event.target as HTMLInputElement).value)
  }
}
</script>

<template>
  <div class="relative h-12 w-full flex items-center">
    <img :src="SearchIcon" alt="search icon" class="absolute left-4" />
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder
      type="search"
      class="rounded-[5px] w-full h-full p-4 pl-10 focus-visible:outline-none shadow-md"
      @keydown="handleOnSearch"
    />
  </div>
</template>
