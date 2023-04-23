import type { Terminal } from '@/omnicomm/dto/terminal'

export interface TreeGroupV2 {
  id: number
  name: string
  parentGroupId: number | null
  objects: Terminal[]
  children: TreeGroupV2[]
}
