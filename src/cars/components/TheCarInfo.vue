<script setup lang="ts">
import { toRefs } from 'vue'
import { useVModel } from '@vueuse/core'
import type Terminal from 'primevue/terminal/Terminal.vue'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'
import type { FuelData } from '@/omnicomm/dto/fuel-data'
import type { TrackPoint } from '@/omnicomm/dto/track-point'
import TheCarState from '@/cars/components/TheCarState.vue'
import TheCarStats from '@/cars/components/TheCarStats.vue'

const props = defineProps<{
  vehicle: Terminal
  state: VehicleState | undefined
  range: [Date, Date]
  fuel: FuelData[]
  track: TrackPoint[]
}>()

const emits = defineEmits<{
  (e: 'update:range', value: [Date, Date]): void
}>()

const range = useVModel(props, 'range', emits)
const { vehicle, state, fuel, track } = toRefs(props)
</script>

<template>
  <div class="car-info-component">
    <TheCarState class="car-state" :vehicle="vehicle" :state="state" />

    <TheCarStats v-model:range="range" class="car-stats" :fuel="fuel" :track="track" />
  </div>
</template>

<style scoped lang="scss">
.car-info-component {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .car-stats {
    flex: 1;
  }
}
</style>
