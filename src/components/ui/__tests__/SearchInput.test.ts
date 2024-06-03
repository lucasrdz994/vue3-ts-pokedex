import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SearchInput from '../SearchInput.vue'

describe('SearchInput.vue', () => {
  it('emits search event with correct text when Enter key is pressed', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'test search'
      }
    })
    const input = wrapper.find('input')

    await input.setValue('test search')
    await input.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted().search).toBeTruthy()
    expect(wrapper.emitted().search[0]).toEqual(['test search'])
  })
})
