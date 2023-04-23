import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const mapRoute: RouteRecordRaw = {
  name: RouteName.MAP,
  path: '/map',
  component: () => import('../MapPage.vue'),
}
