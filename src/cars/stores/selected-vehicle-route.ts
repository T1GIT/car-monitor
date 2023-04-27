import {
  createGlobalState,
  createSharedComposable,
} from '@vueuse/core'
import { readonly, shallowRef, watch } from 'vue'
import moment from 'moment'
import type { TrackPoint } from '@/omnicomm/dto/track-point'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'
import { omnicommReportsService } from '@/omnicomm/services/omnicomm-reports'

const useGlobalState = createGlobalState(() => ({
  range: shallowRef([moment().startOf('day').toDate(), moment().endOf('day').toDate()]),
  route: shallowRef<TrackPoint[]>(),
}))

export const useSelectedVehicleRoute = createSharedComposable(() => {
  const { range, route } = useGlobalState()

  const { vehicle } = useSelectedVehicle()

  watch(
    [vehicle, range],
    () => {
      if (vehicle.value) {
        void omnicommReportsService.track(vehicle.value.terminal_id, range.value[0], range.value[1])
          .then(({ data }) => route.value = data.track)
      }
    },
    { immediate: true },
  )

  return {
    range,
    route: readonly(route),
  }
})
