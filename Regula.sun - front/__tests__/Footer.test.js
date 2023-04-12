import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue'
// import { expect } from 'vitest';

describe('Footer.vue', () => {
    it('renders correctly', () => {
      const wrapper = shallowMount(Footer);
    });
  });
  describe('Footer.vue', () => {
    it('renders correctly', () => {
      const wrapper = shallowMount(Footer);
      expect(wrapper.exists()).toBe(true);
    });
  });
  describe('Footer.vue', () => {
    it('renders correctly', () => {
      const wrapper = shallowMount(Footer);
      const agemsLink = wrapper.find('#agems');
      const nesLink = wrapper.find('#nes');
      const ufmsLink = wrapper.find('#ufms');
      expect(agemsLink.attributes('href')).toBe('https://www.agems.ms.gov.br/');
      expect(nesLink.attributes('href')).toBe('https://nes.facom.ufms.br/');
      expect(ufmsLink.attributes('href')).toBe('https://www.ufms.br/');
      expect(agemsLink.find('img').attributes('src')).toBe('src/assets/AGEMS.svg');
      expect(nesLink.find('img').attributes('src')).toBe('src/assets/NES.svg');
      expect(ufmsLink.find('img').attributes('src')).toBe('src/assets/UFMS-LOGO.svg');
    });
  });
      
  