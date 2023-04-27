import { beforeEach, describe, expect, it } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'

import PrimeVue from 'primevue/config'
import DateRange from '@/shared/components/DateRange.vue'

describe('DateRange', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(DateRange, {
      props: { range: [new Date(), new Date()] },
      global: {
        plugins: [PrimeVue],
      },
    })
  })

  it('should be visible', () => {
    expect(wrapper.isVisible()).toBeTruthy()
  })

  it('should have trigger button', () => {
    expect(wrapper.find('.p-datepicker-trigger').exists()).toBeTruthy()
  })
})
