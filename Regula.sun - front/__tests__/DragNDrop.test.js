import DragNDrop from "../src/components/DragNDrop.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, beforeEach, it, expect } from "vitest";

describe("DragNDrop", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DragNDrop, {
      propsData: {
        titulo: "Importar Indicadores/Metas",
        idInput: "indicadores",
      },
    });
  });

  it("renderizacao da interface é feita corretamente", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".container").exists()).toBe(true);
    expect(wrapper.find(".area-titulo").exists()).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Importar Indicadores/Metas");
    expect(wrapper.find(".area-upload").exists()).toBe(true);
    expect(wrapper.find(".dropzone").exists()).toBe(true);
    expect(wrapper.find(".divLabels").exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
    expect(wrapper.find("#primeira-label").exists()).toBe(true);
    expect(wrapper.find("#segunda-label").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find(".descricao").exists()).toBe(false);
    expect(wrapper.find("span").exists()).toBe(false);
  });

  it("importação de arquivo válido via labels", async () => {
    const file = new File([""], "labelValido.csv", { type: "text/csv" });

    const label = wrapper.find("label");
    Object.defineProperty(label.element, "click", { value: () => {} });
    const entradaArquivo = wrapper.find('input[type="file"]');
    await label.trigger("click");

    entradaArquivo.element.files = [file];
    await entradaArquivo.trigger("change");

    const nomeArquivo = wrapper.find(".descricao span");
    expect(nomeArquivo.text()).toBe("labelValido.csv");
  });

  it("importação de arquivo inválido via labels", async () => {
    const file = new File([""], "labelInvalido.csv", { type: "text/txt" });

    const label = wrapper.find("label");
    Object.defineProperty(label.element, "click", { value: () => {} });
    const entradaArquivo = wrapper.find('input[type="file"]');
    await label.trigger("click");

    entradaArquivo.element.files = [file];
    await entradaArquivo.trigger("change");

    const nomeArquivo = wrapper.find(".descricao span");
    expect(nomeArquivo.text()).toBe("Insira um arquivo válido!");
  });

  it("importação de arquivo válido via drop", async () => {
    const dropzone = wrapper.get(".dropzone");
    await dropzone.trigger("drop", {
      dataTransfer: {
        files: [new File([""], "dropValido.csv", { type: "text/csv" })],
      },
    });
    const nomeArquivo = wrapper.find(".descricao span");
    expect(nomeArquivo.text()).toBe("dropValido.csv");
  });

  it("importação de arquivo inválido via drop", async () => {
    const dropzone = wrapper.get(".dropzone");
    await dropzone.trigger("drop", {
      dataTransfer: {
        files: [new File([""], "dropInvalido.csv", { type: "text/txt" })],
      },
    });
    const nomeArquivo = wrapper.find(".descricao span");
    expect(nomeArquivo.text()).toBe("Insira um arquivo válido!");
  });
});
