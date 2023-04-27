<script setup lang="ts">
import Chart from 'primevue/chart'
import SelectButton from 'primevue/selectbutton'
import { computed, shallowRef, toRefs } from 'vue'
import { useCssVar, useVModel } from '@vueuse/core'
import type { FuelData } from '@/omnicomm/dto/fuel-data'
import type { TrackPoint } from '@/omnicomm/dto/track-point'
import DateRange from '@/shared/components/DateRange.vue'
import { convertTimestamp } from '@/shared/utils/timestamp'

const props = defineProps<{
  range: [Date, Date]
  fuel: FuelData[]
  track: TrackPoint[]
}>()

const emits = defineEmits<{
  (e: 'update:range', value: [Date, Date]): void
}>()

const range = useVModel(props, 'range', emits)
const { fuel, track } = toRefs(props)

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
  labels: fuel.value?.map(({ eD }) => convertTimestamp(eD).toLocaleDateString()) ?? [],
  datasets: [
    {
      ...commonDatasetOptions,
      label: 'Топливо, л.',
      data: fuel.value?.map(({ aV }) => aV) ?? [],
    },
  ],
}))

const speedDataset = computed(() => ({
  labels: track.value?.map(({ date }) => convertTimestamp(date).toLocaleDateString()) ?? [],
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
  <div class="car-stats-component">
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

      <DateRange v-model:range="range" class="date-range" />
    </div>

    <Chart
      class="chart"
      type="line"
      :data="dataset"
      :options="{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }"
    />
  </div>
</template>

<style scoped lang="scss">
.car-stats-component {
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

    .date-range {
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
</style>
