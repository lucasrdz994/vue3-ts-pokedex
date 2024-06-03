<script lang="ts">
export enum FilterToolbarTabs {
  ALL = 'all',
  FAVORITES = 'favorites'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import starIcon from '@/assets/icons/star.svg'
import menuIcon from '@/assets/icons/menu.svg'

import Button, { ButtonVariants } from '@/components/ui/Button.vue'

const emit = defineEmits(['change'])

const activeTab = ref<FilterToolbarTabs>(FilterToolbarTabs.ALL)

function currentButtonVariant(tab: FilterToolbarTabs) {
  return activeTab.value === tab ? ButtonVariants.PRIMARY : ButtonVariants.SECONDARY
}

function handleTabToggle(tab: FilterToolbarTabs) {
  activeTab.value = tab
  emit('change', tab)
}
</script>

<template>
  <section class="fixed bottom-0 right-0 left-0 h-20 bg-white flex items-center justify-center">
    <div class="flex gap-x-4 w-full px-7 md:px-0 md:w-[570px]">
      <Button
        block
        :variant="currentButtonVariant(FilterToolbarTabs.ALL)"
        @click="handleTabToggle(FilterToolbarTabs.ALL)"
      >
        <img :src="menuIcon" alt="menu icon" />
        All
      </Button>
      <Button
        block
        :variant="currentButtonVariant(FilterToolbarTabs.FAVORITES)"
        @click="handleTabToggle(FilterToolbarTabs.FAVORITES)"
      >
        <img :src="starIcon" alt="star icon" />
        Favorites
      </Button>
    </div>
  </section>
</template>
