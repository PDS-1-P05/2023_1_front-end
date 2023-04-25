import { mount } from '@vue/test-utils'
import AdminNavTab from '@/components/AdminNavTab.vue'
import {describe, it, expect } from 'vitest'

describe('AdminNavTab.vue', () => {
    it('renderiza o nav tab apropriadamente', () => {
        const wrapper = mount(AdminNavTab)

        expect(wrapper.find('[data-test="tabs"]').exists()).toBe(true)
        expect(wrapper.find('[data-test="indicadores"]').classes()).toContain('tab')
        expect(wrapper.find('[data-test="metas"]').classes()).toContain('tab')
    })
})