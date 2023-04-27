<script setup lang="ts">
import Calendar from 'primevue/calendar'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  range: [Date, Date]
}>()

const emits = defineEmits<{
  (e: 'update:range', value: [Date, Date]): void
}>()

const range = useVModel(props, 'range', emits)
</script>

<template>
  <Calendar
    v-model="range"
    class="date-range-component"
    selection-mode="range"
    show-time
    show-on-focus
    show-icon
  />
</template>
