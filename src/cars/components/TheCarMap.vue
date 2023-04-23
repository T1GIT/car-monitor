<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { MapboxMarker } from 'vue-mapbox-ts'
import { lngLatConvertor } from '@/map/convertors/lng-lat'
import PreparedMap from '@/shared/components/PreparedMap.vue'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'

const props = defineProps<{
  state: VehicleState | undefined
}>()

const { state } = toRefs(props)

const position = computed(() => state.value && lngLatConvertor.fromPoint(state.value.lastGPS))
</script>

<template>
  <PreparedMap class="car-map-component" :center="position" :zoom="14">
    <MapboxMarker
      v-if="state"
      :lng-lat="position"
      anchor="center"
      :rotation="state.lastGPSDir"
    >
      <template #icon>
        <img
          class="marker" src="@/cars/assets/marker.png?url"
          alt="marker"
        >
      </template>
    </MapboxMarker>
  </PreparedMap>
</template>

<style scoped lang="scss">
.car-map-component {
  .marker {
    width: 40px;
    height: 40px;
  }
}
</style>
