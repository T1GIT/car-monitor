import {
  createGlobalState,
  createSharedComposable, useIntervalFn,
  useLocalStorage, whenever,
} from '@vueuse/core'
import { readonly } from 'vue'
import { serializer } from '@/shared/utils/serializer'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'
import { omnicommVehiclesService } from '@/omnicomm/services/omnicomm-vehicles'
import { useSelectedVehicle } from '@/cars/stores/selected-vehicle'

const useGlobalState = createGlobalState(() => ({
  state: useLocalStorage<VehicleState | undefined>('vehicle-state', undefined, { serializer }),
}))

export const useSelectedVehicleState = createSharedComposable(() => {
  const { state } = useGlobalState()

  const { vehicle } = useSelectedVehicle()

  async function fetch() {
    if (vehicle.value) {
      const { data } = await omnicommVehiclesService.state(vehicle.value.terminal_id)
      state.value = data
    }
  }

  whenever(vehicle, fetch, { immediate: true })
  useIntervalFn(fetch, 10000)

  return {
    state: readonly(state),
  }
})
