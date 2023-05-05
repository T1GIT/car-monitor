import {
  createGlobalState,
  createSharedComposable, useIntervalFn,
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

  async function fetch() {
    if (vehicle.value) {
      const { data } = await omnicommReportsService.track(vehicle.value.terminal_id, range.value[0], range.value[1])
      route.value = data.track
    }
  }

  watch([vehicle, range], fetch, { immediate: true })
  useIntervalFn(fetch, 10000)

  return {
    range,
    route: readonly(route),
  }
})
