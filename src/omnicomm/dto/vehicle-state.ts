import type { StatePoint } from '@/omnicomm/dto/state-point'

export interface VehicleState {
  address: string
  currentFuel: number
  currentIgn: boolean
  currentSpeed: number
  voltage: number
  lastGPS: StatePoint
  lastGPSDir: number
}
