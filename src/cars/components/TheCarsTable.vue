<script setup lang="ts">
import DataTable from 'primevue/datatable'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import type { Terminal } from '@/omnicomm/dto/terminal'

const props = defineProps<{
  vehicles: Terminal[]
  selected: Terminal | undefined
}>()

const emits = defineEmits<{
  (e: 'update:selected', value: Terminal | undefined): void
}>()

const selected = useVModel(props, 'selected', emits)

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
</script>

<template>
  <DataTable
    v-model:selection="selected"
    v-model:filters="filters"
    class="cars-table-component"
    :global-filter-fields="['name']"
    :value="props.vehicles"
    :scrollable="true"
    scroll-height="flex"
    data-key="uuid"
    selection-mode="single"
  >
    <template #header>
      <span class="header p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="filters.global.value" class="input" placeholder="Поиск ..." />
      </span>
    </template>

    <Column field="name" header="Название" :sortable="true" />
  </DataTable>
</template>

<style lang="scss" scoped>
.cars-table-component {
  ::v-deep(.p-datatable-header) {
    display: flex;

    .header {
      flex: auto;
      display: flex;

      .input {
        flex: auto;
      }
    }
  }
}
</style>
