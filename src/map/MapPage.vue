<script setup lang="ts">
import {
  MapboxGeogeometryFill,
  MapboxGeogeometryPolygon, MapboxMarker, MapboxPopup,
} from 'vue-mapbox-ts'
import Button from 'primevue/button'
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { PrimeIcons } from 'primevue/api'
import { useGeozones } from '@/map/stores/geozones'
import { lngLatConvertor } from '@/map/convertors/lng-lat'
import PreparedMap from '@/shared/components/PreparedMap.vue'
import { useActivities } from '@/map/stores/activities'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'
import { useVehicles } from '@/cars/stores/vehicles'
import { RouteName } from '@/shared/constants/route-name'

const center = shallowRef([33.59, 44.506])

const { geozones } = useGeozones()

const { activities } = useActivities()

const { vehicle } = useSelectedVehicle()
const { vehicles } = useVehicles()
const router = useRouter()
async function goVehicle(uuid: string) {
  await router.push({ name: RouteName.CARS })
  vehicle.value = vehicles.value?.find(vehicle => vehicle.uuid === uuid)
}
</script>

<template>
  <div class="map-page">
    <PreparedMap class="map" :center="center" :zoom="14">
      <template v-if="geozones">
        <MapboxGeogeometryPolygon
          v-for="geozone of geozones.slice(0, -7)"
          :key="geozone.uuid"
          :path="geozone.points.map(lngLatConvertor.fromPoint)"
        >
          <MapboxGeogeometryFill
            :color="geozone.color"
            :opacity="(1 - (geozone.transparency / 100)) / 3"
            outline-color="black"
          />
        </MapboxGeogeometryPolygon>
      </template>

      <template v-if="activities">
        <MapboxMarker
          v-for="activity of activities"
          :key="activity.uuid"
          :lng-lat="lngLatConvertor.fromPoint(activity)"
          anchor="center"
          :rotation="activity.direction"
          @hover="$event.target.click()"
        >
          <MapboxPopup>
            <div class="popup">
              <span class="name">{{ activity.regNum }}</span>

              <Button
                class="button"
                severity="info"
                size="small"
                :icon="PrimeIcons.ARROW_RIGHT"
                @click="goVehicle(activity.uuid)"
              />
            </div>
          </MapboxPopup>

          <template #icon>
            <img
              class="marker"
              :class="{ inactive: !activity.ignition }"
              src="@/shared/assets/marker.png?url"
              alt="marker"
            >
          </template>
        </MapboxMarker>
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

  .map {
    .marker {
      width: 40px;
      cursor: pointer;

      &.inactive {
        filter: grayscale(1);
      }
    }

    .popup {
      position: relative;
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 20px;

      .name {
        color: var(--primary-color-text);
        font-size: 24px;
      }

      .button {
        width: 100%;
      }
    }
  }
}
</style>
