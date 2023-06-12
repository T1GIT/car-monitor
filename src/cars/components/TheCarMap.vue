<script setup lang="ts">
import { computed, toRefs } from 'vue'
import {
  MapboxGeogeometryLine,
  MapboxGeogeometryRaw,
  MapboxMarker,
} from 'vue-mapbox-ts'
import type { Feature } from 'geojson'
import { useCssVar } from '@vueuse/core'
import { lngLatConvertor } from '@/map/convertors/lng-lat'
import PreparedMap from '@/shared/components/PreparedMap.vue'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'
import DateRange from '@/shared/components/DateRange.vue'
import { useSelectedVehicleRoute } from '@/cars/stores/selected-vehicle-route'

const props = defineProps<{
  state: VehicleState | undefined
}>()

const { state } = toRefs(props)

const position = computed(() => state.value && lngLatConvertor.fromPoint(state.value!.lastGPS))

const { range, route } = useSelectedVehicleRoute()
const geoRoute = computed<Feature | undefined | CanvasLineCap>(() => route.value && {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: route.value.map(lngLatConvertor.fromPoint),
  },
  properties: {},
})

const primaryColor = useCssVar('--primary-color')
</script>

<template>
  <div class="car-map-component">
    <DateRange v-model:range="range" />

    <PreparedMap class="map" :center="position" :zoom="14">
      <MapboxMarker
        v-if="state"
        :lng-lat="position"
        anchor="center"
        :rotation="state.lastGPSDir"
      >
        <template #icon>
          <img
            class="marker"
            :class="{ inactive: !state.currentIgn }"
            src="@/shared/assets/marker.png?url"
            alt="marker"
          >
        </template>
      </MapboxMarker>

      <MapboxGeogeometryRaw v-if="geoRoute" :source="geoRoute">
        <MapboxGeogeometryLine
          :width="4"
          :color="primaryColor"
          :opacity="0.6"
          :dasharray="[0.5, 2]"
          :offset="2"
          cap="round"
          join="round"
        />
      </MapboxGeogeometryRaw>
    </PreparedMap>
  </div>
</template>

<style scoped lang="scss">
.car-map-component {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .map {
    .marker {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
