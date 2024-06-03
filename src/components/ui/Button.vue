<script lang="ts">
export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ to?: string; block?: boolean; variant?: ButtonVariants }>()

const component = computed(() => (props.to ? 'RouterLink' : 'button'))
</script>

<template>
  <component
    :is="component"
    :to
    :class="{
      'w-full': block,
      'bg-primary active:bg-primary-dark': !Boolean(variant) || variant === ButtonVariants.PRIMARY,
      'bg-secondary': variant === ButtonVariants.SECONDARY
    }"
    class="text-white font-bold py-3 px-5 rounded-full flex items-center justify-center"
  >
    <span class="flex items-center gap-x-3">
      <slot />
    </span>
  </component>
</template>
