import { axiosOmnicommAuth } from '@/omnicomm/utils/axios'
import type { TreeGroupV2 } from '@/omnicomm/dto/tree-group-v2'
import type { VehicleState } from '@/omnicomm/dto/vehicle-state'

export const omnicommVehiclesService = {
  vehicles: () =>
    axiosOmnicommAuth.get<TreeGroupV2>(
      'ls/api/v2/tree/vehicle',
    ),

  state: (vehicleId: number) =>
    axiosOmnicommAuth.get<VehicleState>(
      `ls/api/v1/vehicles/${vehicleId}/state`,
    ),
}
