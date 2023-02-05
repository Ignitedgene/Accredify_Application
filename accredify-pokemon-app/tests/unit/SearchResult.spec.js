import SearchViewVue from '@/views/SearchView.vue'
import { shallowMount } from '@vue/test-utils'

describe('SearchView.vue', () => {
  it('renders image and text', () => {
    const msg = 'new message'
    const wrapper = shallowMount(SearchViewVue, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
