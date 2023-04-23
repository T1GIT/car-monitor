<script setup lang="ts">
import { computed, toRefs } from 'vue'
import Panel from 'primevue/panel'
import type Terminal from 'primevue/terminal/Terminal.vue'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'

const props = defineProps<{
  vehicle: Terminal
  state: VehicleState | undefined
}>()

const { vehicle, state } = toRefs(props)

const info = computed<{ icon: string; value: string }[]>(
  () => [
    { icon: 'bi-speedometer2', value: state.value ? `${state.value.currentSpeed} км/ч` : '' },
    { icon: 'bi-fuel-pump', value: state.value ? `${state.value.currentFuel} л.` : '' },
    { icon: 'bi-lightning-charge', value: state.value ? `${state.value.voltage} в.` : '' },
    { icon: 'bi-key', value: state.value ? (state.value.currentIgn ? 'Заведена' : 'Заглушена') : '' },
  ])
</script>

<template>
  <Panel class="car-state-component" :header="vehicle.name">
    <div v-for="item of info" :key="item.icon" class="item">
      <i class="icon pi" :class="item.icon" />

      <span class="value">{{ item.value }}</span>
    </div>
  </Panel>
</template>

<style scoped lang="scss">
.car-state-component {
  ::v-deep(.p-panel-header) {
    justify-content: center;
  }

  ::v-deep(.p-panel-content) {
    padding: 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 20px;

    .icon {
      font-size: 24px;
    }

    .value {
      font-size: 18px;
    }
  }
}
</style>
