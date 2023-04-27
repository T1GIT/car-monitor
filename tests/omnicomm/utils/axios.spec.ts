import { describe, expect, it } from 'vitest'
import { axiosOmnicommAuth, axiosOmnicommBasic } from '@/omnicomm/utils/axios'

describe('axiosOmnicommBasic', () => {
  it('should be defined', () => {
    expect(axiosOmnicommBasic).toBeDefined()
  })
})

describe('axiosOmnicommAuth', () => {
  it('should be defined', () => {
    expect(axiosOmnicommAuth).toBeDefined()
  })
})
