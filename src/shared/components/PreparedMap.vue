<script setup lang="ts">
import Card from 'primevue/card'
import {
  MapboxGeolocateControl,
  MapboxMap,
  MapboxNavigationControl,
} from 'vue-mapbox-ts'
import type { Map } from 'mapbox-gl'
import { ref, shallowRef } from 'vue'
import { useVModels, whenever } from '@vueuse/core'

const props = defineProps<{
  center?: [number, number]
  zoom?: number
}>()

const emits = defineEmits<{
  (e: 'update:center', value: [number, number]): void
  (e: 'update:zoom', value: number): void
}>()

const { center, zoom } = useVModels(props, emits)

const token = import.meta.env.VITE_MAPBOX_TOKEN
const style = 'mapbox://styles/t1mon/clgqyvw1l000f01pnaa6kcug3'

const map = shallowRef<Map>()

const loading = ref(true)

const mapRef = shallowRef()
async function load() {
  loading.value = false
  map.value = await mapRef.value.vmb_map.promise
}

whenever(map, (map) => {
  const labels = ['country-label', 'settlement-label', 'state-label', 'settlement-subdivision-label']
  labels.forEach(label =>
    map.setLayoutProperty(label, 'text-field', ['get', 'name_ru']),
  )
})
</script>

<template>
  <Card class="map-card">
    <template #content>
      <MapboxMap
        ref="mapRef"
        v-model:center="center"
        v-model:zoom="zoom"
        :access-token="token"
        :map-style="style"
        auto-resize
        @loaded="load"
      >
        <MapboxNavigationControl />
        <MapboxGeolocateControl />

        <slot v-if="!loading" />
      </MapboxMap>
    </template>
  </Card>
</template>

<style scoped lang="scss">
  .map-card {
    flex: 1;
    display: flex;
    overflow: hidden;

    ::v-deep(.p-card-body) {
      padding: 0;
      flex: 1;
      display: flex;

      .p-card-content {
        padding: 0;
        flex: 1;
      }
    }
  }
</style>
