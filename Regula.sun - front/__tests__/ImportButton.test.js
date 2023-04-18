import { shallowMount } from '@vue/test-utils'
import ImportButton from '@/components/ImportButton.vue'
import {describe, it, expect } from 'vitest'

describe('ImportButton.vue', () => {
    it('renderiza o botão caso o prop seja passado', async() => {
        const wrapper = shallowMount(ImportButton, {
            propsData: {
                conteudo: 'teste'
              }
        })

        expect(wrapper.findAll('button')).toHaveLength(1);
    })

    it('nao renderiza o botão caso o prop nao seja passado', async() => {
        const wrapper = shallowMount(ImportButton)

        expect(wrapper.findAll('button')).toHaveLength(0)
    })

    it('renderiza o prop passado para o botao', async() => {
        const wrapper = shallowMount(ImportButton)

        await wrapper.setProps({ conteudo: 'teste' })

        expect(wrapper.vm.conteudo).toBe('teste')
    })
})