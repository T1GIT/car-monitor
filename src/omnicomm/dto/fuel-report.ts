import type { FuelData } from '@/omnicomm/dto/fuel-data'

export interface FuelReport {
  tankData: {
    data: FuelData[]
  }[]
}
