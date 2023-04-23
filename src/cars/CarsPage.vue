<script setup lang="ts">
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Calendar from 'primevue/calendar'
import Chart from 'primevue/chart'
import SelectButton from 'primevue/selectbutton'
import { computed, shallowRef } from 'vue'
import Panel from 'primevue/panel'
import { MapboxMarker } from 'vue-mapbox-ts'
import { useCssVar } from '@vueuse/core'
import moment from 'moment'
import { useVehicles } from '@/cars/stores/vehicals'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'
import { lngLatConvertor } from '@/map/convertors/lng-lat'
import PreparedMap from '@/shared/components/PreparedMap.vue'
import { useSelectedVehicleStats } from '@/cars/stores/selected-vehicle-stats'

const { vehicles } = useVehicles()

const { vehicle, state } = useSelectedVehicle()

const position = computed(() => state.value && lngLatConvertor.fromPoint(state.value.lastGPS))

const info = computed<{ icon: string; value: string }[]>(
  () => !state.value
    ? []
    : [
        { icon: 'bi-speedometer2', value: `${state.value.currentSpeed} км/ч` },
        { icon: 'bi-fuel-pump', value: `${state.value.currentFuel} л.` },
        { icon: 'bi-lightning-charge', value: `${state.value.voltage} в.` },
        { icon: 'bi-key', value: state.value.currentIgn ? 'Заведена' : 'Заглушена' },
      ])

const { range, fuel, track } = useSelectedVehicleStats()

const chartTypeOptions: { icon: string; value: string }[] = [
  { icon: 'pi bi-fuel-pump', value: 'fuel' },
  { icon: 'pi bi-speedometer2', value: 'speed' },
]
const chartType = shallowRef(chartTypeOptions[0])

const primaryColor = useCssVar('--primary-color')
const commonDatasetOptions = {
  pointBorderColor: 'transparent',
  pointBackgroundColor: 'transparent',
  borderColor: primaryColor.value,
}

const fuelDataset = computed(() => ({
  labels: fuel.value?.map(({ eD }) => moment.unix(eD).toDate().toDateString()) ?? [],
  datasets: [
    {
      ...commonDatasetOptions,
      label: 'Топливо, л.',
      data: fuel.value?.map(({ aV }) => aV) ?? [],
    },
  ],
}))

const speedDataset = computed(() => ({
  labels: track.value?.map(({ date }) => moment.unix(date).toDate().toDateString()) ?? [],
  datasets: [
    {
      ...commonDatasetOptions,
      label: 'Скорость, км/ч',
      data: track.value?.map(({ speed }) => speed) ?? [],
    },
  ],
}))

const dataset = computed(() => chartType.value.value === 'fuel' ? fuelDataset.value : speedDataset.value)
</script>

<template>
  <Splitter class="cars-page">
    <SplitterPanel class="splitter-panel table">
      <DataTable
        v-model:selection="vehicle"
        class="table"
        :value="vehicles"
        :scrollable="true"
        scroll-height="flex"
        data-key="uuid"
        selection-mode="single"
      >
        <Column field="name" header="Название" :sortable="true" />
      </DataTable>
    </SplitterPanel>

    <SplitterPanel v-if="vehicle" class="splitter-panel map">
      <PreparedMap class="map" :center="position" :zoom="14">
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
    </SplitterPanel>

    <SplitterPanel v-if="vehicle" class="splitter-panel info">
      <div class="info">
        <Panel class="info-panel" :header="vehicle.name">
          <div v-for="item of info" :key="item.icon" class="item">
            <i class="icon pi" :class="item.icon" />

            <span class="value">{{ item.value }}</span>
          </div>
        </Panel>

        <div class="stats">
          <div class="header">
            <i class="icon pi bi-bar-chart" />

            <span class="text">Статистика</span>
          </div>

          <div class="filter">
            <SelectButton v-model="chartType" class="type-selector" :options="chartTypeOptions" option-label="value" data-key="value">
              <template #option="{ option }">
                <i class="pi" :class="option.icon" />
              </template>
            </SelectButton>

            <Calendar
              v-model="range"
              class="calendar"
              selection-mode="range"
              show-time
              show-on-focus
              show-icon
            />
          </div>

          <Chart
            class="chart"
            type="line"
            :data="dataset"
            :options="{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }"
          />
        </div>
      </div>
    </SplitterPanel>
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

    .table, .map, .info {
      flex: 1;
    }

    .map {
      .marker {
        width: 40px;
        height: 40px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .info-panel {
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

      .stats {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;

          .icon {
            font-size: 24px;
          }

          .text {
            font-size: 24px;
          }
        }

        .filter {
          display: flex;
          align-items: stretch;
          gap: 10px;

          .calendar {
            flex: 1;
          }

          .type-selector {
            display: flex;
            align-items: stretch;
          }
        }

        .chart {
          flex: auto;
        }
      }
    }
  }
}
</style>
