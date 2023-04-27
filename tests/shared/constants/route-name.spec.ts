import { describe, expect, it } from 'vitest'
import { RouteName } from '@/shared/constants/route-name'

describe('RouteName', () => {
  it('should have string values', () => {
    Object.values(RouteName).forEach((value) => {
      expect(value).toBeTypeOf('string')
    })
  })
})
