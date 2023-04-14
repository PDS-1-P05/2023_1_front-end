import { shallowMount } from '@vue/test-utils';
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

  it('tags internas sendo renderizadas', () => {
    const wrapper = shallowMount(HomeView);

    const hero = wrapper.find('#hero')

    const tagDiv = hero.findAll('div')
    const tagH2 = hero.findAll('h2')
    const tagP = hero.findAll('p')

    expect(tagDiv.length).toBe(2)
    expect(tagH2.length).toBe(1)
    expect(tagP.length).toBe(1)
  })

  it('estilo das tags internas sendo aplicados', () => {
    const wrapper = shallowMount(HomeView);

    const hero = wrapper.find('#hero')

    expect(hero.html()).toContain('linha-horizontal')
    expect(hero.html()).toContain('hero-wrapper')
  })
})

describe('HomeView - Unit - Sobre', () => {
  it('estilo da section definido', () => {
    const wrapper = shallowMount(HomeView)

    const sobre = wrapper.find('#sobre')

    expect(sobre.classes()).toContain('wrapper')
  })

  it('tags internas sendo renderizadas', () => {
    const wrapper = shallowMount(HomeView);

    const sobre = wrapper.find('#sobre')

    const tagDiv = sobre.findAll('div')
    const tagH3 = sobre.findAll('h3')
    const tagP = sobre.findAll('p')
    const tagImg = sobre.findAll('img')

    expect(tagDiv.length).toBe(5)
    expect(tagH3.length).toBe(1)
    expect(tagP.length).toBe(1)
    expect(tagImg.length).toBe(1)
  })

  it('estilo das tags internas sendo aplicados', () => {
    const wrapper = shallowMount(HomeView);

    const sobre = wrapper.find('#sobre')

    expect(sobre.html()).toContain('linha-vertical')
    expect(sobre.html()).toContain('coluna-a')
    expect(sobre.html()).toContain('coluna-b')
    expect(sobre.html()).toContain('texto-wrapper')
  })

  it('imagem possui o src correto', () => {
    const wrapper = shallowMount(HomeView);

    const sobre = wrapper.find('#sobre')
    const img = sobre.find('img')

    expect(img.attributes('src')).toContain('/REGULASUN.svg')
  })
})


describe('HomeView - Unit - Gráfico', () => {
  it('estilo da section definido', () => {
    const wrapper = shallowMount(HomeView)

    const grafico = wrapper.find('#grafico')

    expect(grafico.classes()).toContain('wrapper')
    expect(grafico.classes()).toContain('background')
  })

  it('tags internas sendo renderizadas', () => {
    const wrapper = shallowMount(HomeView);

    const grafico = wrapper.find('#grafico')

    const tagDiv = grafico.findAll('div')
    const tagH3 = grafico.findAll('h3')
    const tagP = grafico.findAll('p')
    const tagImg = grafico.findAll('img')

    expect(tagDiv.length).toBe(7)
    expect(tagH3.length).toBe(1)
    expect(tagP.length).toBe(1)
    expect(tagImg.length).toBe(1)
  })

  it('estilo das tags internas sendo aplicados', () => {
    const wrapper = shallowMount(HomeView);

    const grafico = wrapper.find('#grafico')

    expect(grafico.html()).toContain('coluna-b')
    expect(grafico.html()).toContain('moldura-grafico')
    expect(grafico.html()).toContain('coluna-a-wrapper')
    expect(grafico.html()).toContain('coluna-a')
    expect(grafico.html()).toContain('texto-wrapper-esquerda')
    expect(grafico.html()).toContain('linha-vertical-branca')
  })

  it('imagem possui o src correto', () => {
    const wrapper = shallowMount(HomeView);

    const grafico = wrapper.find('#grafico')
    const img = grafico.find('img')

    expect(img.attributes('src')).toContain('/CHARTS.png')
  })
})

describe('HomeView - Unit - Boletim', () => {
  it('estilo da section definido', () => {
    const wrapper = shallowMount(HomeView)

    const boletim = wrapper.find('#boletim')

    expect(boletim.classes()).toContain('wrapper')
  })

  it('tags internas sendo renderizadas', () => {
    const wrapper = shallowMount(HomeView);

    const boletim = wrapper.find('#boletim')

    const tagDiv = boletim.findAll('div')
    const tagH3 = boletim.findAll('h3')
    const tagP = boletim.findAll('p')
    const tagImg = boletim.findAll('img')

    expect(tagDiv.length).toBe(7)
    expect(tagH3.length).toBe(1)
    expect(tagP.length).toBe(1)
    expect(tagImg.length).toBe(1)
  })

  it('estilo das tags internas sendo aplicados', () => {
    const wrapper = shallowMount(HomeView);

    const boletim = wrapper.find('#boletim')

    expect(boletim.html()).toContain('coluna-a-wrapper')
    expect(boletim.html()).toContain('coluna-a')
    expect(boletim.html()).toContain('linha-vertical')
    expect(boletim.html()).toContain('texto-wrapper')
    expect(boletim.html()).toContain('coluna-b')
    expect(boletim.html()).toContain('moldura-boletim')
  })

  it('imagem possui o src correto', () => {
    const wrapper = shallowMount(HomeView);

    const boletim = wrapper.find('#boletim')
    const img = boletim.find('img')

    expect(img.attributes('src')).toContain('/BOLETIM.png')
  })
})


