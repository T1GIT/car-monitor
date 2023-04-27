import {
  createGlobalState,
  createSharedComposable,
} from '@vueuse/core'
import { readonly, shallowRef, watch } from 'vue'
import moment from 'moment'
import type { FuelData } from '@/omnicomm/dto/fuel-data'
import type { TrackPoint } from '@/omnicomm/dto/track-point'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'
import { omnicommReportsService } from '@/omnicomm/services/omnicomm-reports'

const useGlobalState = createGlobalState(() => ({
  range: shallowRef([moment().startOf('day').toDate(), moment().endOf('day').toDate()]),
  fuel: shallowRef<FuelData[]>(),
  track: shallowRef<TrackPoint[]>(),
}))

export const useSelectedVehicleStats = createSharedComposable(() => {
  const { range, fuel, track } = useGlobalState()

  const { vehicle } = useSelectedVehicle()

  watch(
    [vehicle, range],
    () => {
      if (vehicle.value) {
        void omnicommReportsService.fuel(vehicle.value.terminal_id, range.value[0], range.value[1])
          .then(({ data }) => fuel.value = data.tankData?.at(0)?.data)

        void omnicommReportsService.track(vehicle.value.terminal_id, range.value[0], range.value[1])
          .then(({ data }) => track.value = data.track)
      }
    },
    { immediate: true },
  )

  return {
    range,
    fuel: readonly(fuel),
    track: readonly(track),
  }
})
