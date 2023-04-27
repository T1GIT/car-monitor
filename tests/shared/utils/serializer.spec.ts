import { describe, expect, it } from 'vitest'
import { serializer } from '@/shared/utils/serializer'

describe('serializer', () => {
  describe('read', () => {
    it('should parse string to object', () => {
      expect(serializer.read('{"a": 1}')).toStrictEqual({ a: 1 })
    })

    it('should parse undefined string to undefined', () => {
      expect(serializer.read('undefined')).toBeUndefined()
    })
  })

  describe('write', () => {
    it('should stringify object', () => {
      expect(serializer.write({ a: 1 })).toStrictEqual('{"a":1}')
    })
  })
})
