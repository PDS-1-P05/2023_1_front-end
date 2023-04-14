import { shallowMount, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import HomeView from '@/views/HomeView.vue';
import HomeButton from '@/components/HomeButton.vue';
import HomeFooter from '@/components/HomeFooter.vue';

describe('HomeView - Unit', () => {
  it('renderiza a tag main', () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.html()).toContain('main');
  });

  it('renderiza os botões HomeButton', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        components: {
          HomeButton,
        },
      },
    });
    expect(wrapper.findComponent(HomeButton).exists()).toBe(true);
  });

  it('renderiza o HomeFooter', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        components: {
          HomeFooter,
        },
      },
    });
    expect(wrapper.findComponent(HomeFooter).exists()).toBe(true);
  });

  it('deve haver 4 sections', () => {
    const wrapper = shallowMount(HomeView);

    const tagSection = wrapper.findAll('section')
    expect(tagSection.length).toBe(4)
  })

  it('setta corretamente a classe wrapper-section com a largura >= 600px', async () => {
    const wrapper = shallowMount(HomeView);
    await wrapper.setData({ largura: 600 });
    expect(wrapper.vm.classe).toBe('wrapper-section');
  });

  it('setta corretamente a wrapper-section-mobile com a largura <= 600px', async () => {
    const wrapper = shallowMount(HomeView);
    await wrapper.setData({ largura: 599 });
    expect(wrapper.vm.classe).toBe('wrapper-section-mobile');
  });
});

describe('HomeView - Unit - Hero', () => {
  it('estilo da section definido', () => {
    const wrapper = shallowMount(HomeView)

    const hero = wrapper.find('#hero')

    expect(hero.classes()).toContain('wrapper')
    expect(hero.classes()).toContain('background-hero')
  })

  it('tags internas sendo renderizadas'), () => {
    const wrapper = shallowMount(HomeView)

    const idHero = wrapper.find('#hero')
    expect(idHero.length).toBe(3)

  }
})

describe('HomeView - Unit - Sober', () => {
  it('')
})


describe('HomeView - Unit - Gráfico', () => {
  it('')
})

describe('HomeView - Unit - Boletim', () => {
  it('')
})


