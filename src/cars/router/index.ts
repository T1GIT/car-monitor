import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const carsRoute: RouteRecordRaw = {
  name: RouteName.CARS,
  path: '/cars',
  component: () => import('../CarsPage.vue'),
}
