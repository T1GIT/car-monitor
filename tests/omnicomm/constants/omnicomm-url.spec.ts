import { describe, expect, it } from 'vitest'
import { OMNICOMM_URL } from '@/omnicomm/constants/omnicom-url'

describe('OMNICOMM_URL', () => {
  it('should be string', () => {
    expect(OMNICOMM_URL).toBeTypeOf('string')
  })
})
