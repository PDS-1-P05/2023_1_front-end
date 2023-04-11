import { mount } from '@vue/test-utils'
import HomeButton from '@/components/HomeButton.vue'
import { expect } from 'vitest';

test('mount component', async()=> {
    expect(HomeButton).toBeTruthy();

    const wrapper = mount(HomeButton, {
        props: {
            conteudo:"Gere seu gráfico!",
        },
    });
    expect(wrapper.text()).toContain("Gere seu gráfico!");
})