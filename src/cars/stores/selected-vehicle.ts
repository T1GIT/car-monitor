import {
  createGlobalState,
  createSharedComposable,
  useLocalStorage,
} from '@vueuse/core'
import type { Terminal } from '@/omnicomm/dto/terminal'
import { serializer } from '@/shared/utils/serializer'

const useGlobalState = createGlobalState(() => ({
  vehicle: useLocalStorage<Terminal | undefined>('selected-vehicle', undefined, { serializer }),
}))

export const useSelectedVehicle = createSharedComposable(() => {
  const { vehicle } = useGlobalState()

  return {
    vehicle,
  }
})
