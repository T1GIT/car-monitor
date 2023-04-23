<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { useVehicles } from '@/cars/stores/vehicals'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'
import { useSelectedVehicleStats } from '@/cars/stores/selected-vehicle-stats'
import CarMap from '@/cars/components/TheCarMap.vue'
import TheCarsTable from '@/cars/components/TheCarsTable.vue'
import TheCarInfo from '@/cars/components/TheCarInfo.vue'

const { vehicles } = useVehicles()
const { vehicle, state } = useSelectedVehicle()
const { range, fuel, track } = useSelectedVehicleStats()
</script>

<template>
  <Splitter class="cars-page">
    <SplitterPanel class="splitter-panel table">
      <TheCarsTable v-model:selected="vehicle" :vehicles="vehicles ?? []" class="cars-table" />
    </SplitterPanel>

    <SplitterPanel v-if="vehicle" class="splitter-panel map">
      <CarMap class="car-map" :state="state" />
    </SplitterPanel>

    <SplitterPanel v-if="vehicle" class="splitter-panel info">
      <TheCarInfo
        v-model:range="range"
        class="car-info"
        :vehicle="vehicle"
        :state="state"
        :fuel="fuel ?? []"
        :track="track ?? []"
      />
    </splitterpanel>
  </Splitter>
</template>

<style scoped lang="scss">
.cars-page {
  overflow: hidden;

  .splitter-panel {
    display: flex;

    &.map,  &.info {
      padding: 10px;
    }

    .cars-table, .car-map, .car-info {
      flex: 1;
    }
  }
}
</style>
