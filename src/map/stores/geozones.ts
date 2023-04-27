import {
  createGlobalState,
  createSharedComposable,
  tryOnMounted,
} from '@vueuse/core'
import { readonly, shallowRef } from 'vue'
import type { Geozone } from '@/omnicomm/dto/geozone'
import { omnicommGeozonesService } from '@/omnicomm/services/omnicomm-geozones'

const useGlobalState = createGlobalState(() => ({
  geozones: shallowRef<Geozone[]>(),
}))

export const useGeozones = createSharedComposable(() => {
  const { geozones } = useGlobalState()

  async function fetch() {
    const { data } = await omnicommGeozonesService.geozones()
    geozones.value = data.rows
  }
  tryOnMounted(fetch)

  return {
    geozones: readonly(geozones),
  }
})
