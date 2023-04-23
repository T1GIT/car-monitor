<script setup lang="ts">
import {
  MapboxGeogeometryPolygon,
} from 'vue-mapbox-ts'
import { shallowRef } from 'vue'
import { useOmnicommGeozones } from '@/map/stores/omnicomm-geozones'
import { lngLatConvertor } from '@/map/convertors/lng-lat'
import PreparedMap from '@/shared/components/PreparedMap.vue'

const center = shallowRef([33.6, 44.5])

const { geozones } = useOmnicommGeozones()
</script>

<template>
  <div class="map-page">
    <PreparedMap :center="center" :zoom="13">
      <template v-if="geozones">
        <MapboxGeogeometryPolygon
          v-for="geozone of geozones.slice(0, -7)"
          :key="geozone.uuid"
          :path="geozone.points.map(lngLatConvertor.fromPoint)"
          :fill-color="geozone.color"
          outline-color="black"
          :opacity="(1 - (geozone.transparency / 100)) / 3"
        />
      </template>
    </PreparedMap>
  </div>
</template>

<style scoped lang="scss">
.map-page {
  padding: 10px;
  display: flex;

  .card {
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
}
</style>
