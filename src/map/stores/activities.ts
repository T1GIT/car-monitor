import {
  createGlobalState,
  createSharedComposable, useIntervalFn,
  whenever,
} from '@vueuse/core'
import { readonly, shallowRef } from 'vue'
import type { Activity } from '@/omnicomm/dto/activity'
import { useVehicles } from '@/cars/stores/vehicles'
import { omnicommReportsService } from '@/omnicomm/services/omnicomm-reports'

const useGlobalState = createGlobalState(() => ({
  activities: shallowRef<Activity[]>(),
}))

export const useActivities = createSharedComposable(() => {
  const { activities } = useGlobalState()

  const { vehicles } = useVehicles()

  async function fetch() {
    if (vehicles.value) {
      const ids = vehicles.value.map(({ terminal_id }) => terminal_id)
      const { data } = await omnicommReportsService.activity(ids)
      activities.value = data
    }
  }
  whenever(vehicles, fetch, { immediate: true })
  useIntervalFn(fetch, 10000)

  return {
    activities: readonly(activities),
  }
})
