import { mount } from "@vue/test-utils";
import Navbar from "@/components/NavBar.vue";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("NavBar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Navegar para as rotas corretas na versão web"),
    () => {
      const rotas = wrapper.findAll(".nav-item");
      expect(rotas.length).toBe(3);

      const rotasEsperadas = [
        { to: "/", icon: "mdi-home", text: "Home" },
        { to: "/grafico", icon: "mdi-chart-bar", text: "Gráfico" },
        { to: "/boletim", icon: "mdi-script-text", text: "Boletim" },
        { to: "/admin", icon: "mdi-account-tie", text: "Admin" },
      ];

      rotas.forEach((link, index) => {
        expect(link.props("to")).toBe(rotasEsperadas[index].to);
        expect(link.find("v-icon").text()).toBe(rotasEsperadas[index].icon);
        expect(link.text()).toContain(rotasEsperadas[index].text);
      });
    };

  it("Abrir dropwdon menu"),
    () => {
      expect(wrapper.vm.mobileNav).toBe(false);

      const menuIcon = wrapper.find(".menu-icon");
      menuIcon.trigger("click");
      expect(wrapper.vm.mobileNav).toBe(true);

      menuIcon.trigger("click");
      expect(wrapper.vm.mobileNav).toBe(false);
    };

  it("Navegar para as rotas corretas na versão mobile"),
    () => {
      window.innerWidth = 600;
      expect(wrapper.vm.mobile).toBe(true);
      wrapper.find(".menu-icon").trigger("click");

      const rotas = wrapper.findAll(".nav-item");
      expect(rotas.length).toBe(3);

      const rotasEsperadas = [
        { to: "/", icon: "mdi-home", text: "Home" },
        { to: "/grafico", icon: "mdi-chart-bar", text: "Gráfico" },
        { to: "/boletim", icon: "mdi-script-text", text: "Boletim" },
        { to: "/admin", icon: "mdi-account-tie", text: "Admin" },
      ];

      rotas.forEach((link, index) => {
        expect(link.props("to")).toBe(rotasEsperadas[index].to);
        expect(link.find("v-icon").text()).toBe(rotasEsperadas[index].icon);
        expect(link.text()).toContain(rotasEsperadas[index].text);
      });
    };

  it("Fechar dropwdon menu"),
    () => {
      wrapper.setData({ mobileNav: true });
      wrapper.find(".menu-icon").trigger("click");
      expect(wrapper.vm.mobileNav).toBe(true);
      wrapper.find(".close-icon").trigger("click");
      expect(wrapper.vm.mobileNav).toBe(false);
    };
});
