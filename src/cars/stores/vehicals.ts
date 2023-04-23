import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
} from '@vueuse/core'
import { readonly, shallowRef } from 'vue'
import type { TreeGroupV2 } from '@/omnicomm/dto/tree-group-v2'
import { omnicommVehiclesService } from '@/omnicomm/services/omnicomm-vehicles'
import type { Terminal } from '@/omnicomm/dto/terminal'

const useGlobalState = createGlobalState(() => ({
  vehicles: shallowRef<Terminal[]>(),
}))

export const useVehicles = createSharedComposable(() => {
  const { vehicles } = useGlobalState()

  function extractTerminals(group: TreeGroupV2): Terminal[] {
    return [
      ...group.objects,
      ...group.children.flatMap(extractTerminals),
    ]
  }

  tryOnMounted(async () => {
    const { data } = await omnicommVehiclesService.vehicles()
    vehicles.value = extractTerminals(data)
  })

  return {
    vehicles: readonly(vehicles),
  }
})
