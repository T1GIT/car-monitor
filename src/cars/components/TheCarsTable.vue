<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useVModel } from '@vueuse/core'
import type { Terminal } from '@/omnicomm/dto/terminal'

const props = defineProps<{
  vehicles: Terminal[]
  selected: Terminal | undefined
}>()

const emits = defineEmits<{
  (e: 'update:selected', value: Terminal | undefined): void
}>()

const selected = useVModel(props, 'selected', emits)
</script>

<template>
  <DataTable
    v-model:selection="selected"
    class="cars-table-component"
    :value="props.vehicles"
    :scrollable="true"
    scroll-height="flex"
    data-key="uuid"
    selection-mode="single"
  >
    <Column field="name" header="Название" :sortable="true" />
  </DataTable>
</template>
