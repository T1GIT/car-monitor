import {
  createGlobalState,
  createSharedComposable,
  useLocalStorage, whenever,
} from '@vueuse/core'
import { readonly } from 'vue'
import type { Terminal } from '@/omnicomm/dto/terminal'
import { serializer } from '@/shared/utils/serializer'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'
import { omnicommVehiclesService } from '@/omnicomm/services/omnicomm-vehicles'

const useGlobalState = createGlobalState(() => ({
  vehicle: useLocalStorage<Terminal | undefined>('selected-vehicle', undefined, { serializer }),
  state: useLocalStorage<VehicleState | undefined>('vehicle-state', undefined, { serializer }),
}))

export const useSelectedVehicle = createSharedComposable(() => {
  const { vehicle, state } = useGlobalState()

  whenever(
    vehicle,
    async ({ terminal_id }) =>
      omnicommVehiclesService.state(terminal_id)
        .then(({ data }) => state.value = data),
    { immediate: true },
  )

  return {
    vehicle,
    state: readonly(state),
  }
})
