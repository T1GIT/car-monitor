import type { GeozonePoint } from '@/omnicomm/dto/geozone-point'

export interface Geozone {
  id: number
  uuid: string
  name: string
  color: string
  transparency: number
  points: GeozonePoint[]
}
