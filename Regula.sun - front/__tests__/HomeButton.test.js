import { mount } from '@vue/test-utils'
import HomeButton from '@/components/HomeButton.vue'
import { expect, describe, test } from 'vitest';

describe('HomeButton - Unit', () => {
    test('componente renderizado', async()=> {
        const wrapper = mount(HomeButton, {
            props: {
                conteudo: 'teste'
            }
        })
    
        expect(HomeButton).toBeTruthy();
        expect(wrapper.text()).toContain("teste");
    })

    test('btn-wrapper deve ser renderizado', async() => {
        const wrapper = mount(HomeButton, {
            props: {
                conteudo: 'teste'
            }
        })

        expect(wrapper.findAll('[data-test="btn-wrapper"]')).toHaveLength(1);
    })

    test('componente de atualizar caso seu prop seja mudado', async() => {
        const wrapper = mount(HomeButton, {
            props: {
                conteudo: 'teste'
            }
        })

        expect(wrapper.html()).toContain('teste')

        await wrapper.setProps({ conteudo: 'goodbye' })

        expect(wrapper.html()).toContain('goodbye')
    })
    
    test('btn-home deve ser renderizado', async() => {
        const wrapper = mount(HomeButton, {
            props: {
                conteudo: 'teste'
            }
        })

        const btn = wrapper.find('[data-test="btn-home"]')

        expect(wrapper.findAll('[data-test="btn-home"]')).toHaveLength(1);
        expect(btn.attributes('size')).toBe('large');
        expect(btn.attributes('rounded')).toBe('xl');
    })
})