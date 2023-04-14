import LoginView from "../src/views/LoginView.vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createRouter, createWebHistory } from "vue-router";
import { mount } from "@vue/test-utils";
import { describe } from "vitest";

describe("LoginView", () => {
  let wrapper, mockAxios;

  beforeEach(() => {
    wrapper = mount(LoginView);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renderizacao da interface é feita corretamente", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".container").exists()).toBe(true);
    expect(wrapper.find(".area-login").exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Login");
    expect(wrapper.find("v-form").exists()).toBe(true);
    expect(wrapper.find('label[for="email"]').text()).toBe("Email:");
    expect(wrapper.find(".input .email").exists()).toBe(true);
    expect(wrapper.find('label[for="senha"]').text()).toBe("Senha:");
    expect(wrapper.find(".input .senha").exists()).toBe(true);
    expect(wrapper.find(".alerta").exists()).toBe(false);
    expect(wrapper.find(".loader").exists()).toBe(false);
    expect(wrapper.find(".botao").exists()).toBe(true);
    expect(wrapper.find(".botao").text()).toBe("Logar");
    expect(wrapper.find(".area-imagem").exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("mostra mensagem de erro se email estiver vazio", () => {
    expect(wrapper.vm.regrasEmail[0]("")).toBe("Insira um email!");
  });

  it("mostra mensagem de erro se email não é valido", () => {
    expect(wrapper.vm.regrasEmail[1]("abc@de.f")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("abc@d.ef")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("ab@cd.ed")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("teste")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("teste.com")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("teste-valido.com")).toBe(
      "E-mail precisa ser válido!"
    );
    expect(wrapper.vm.regrasEmail[1]("teste@valido")).toBe(
      "E-mail precisa ser válido!"
    );
  });

  it("mostra mensagem de erro se email conter espaço", () => {
    expect(wrapper.vm.regrasEmail[2](" testeespaco@exemplo.com ")).toBe(
      "Não insira espaços!"
    );
    expect(wrapper.vm.regrasEmail[2]("teste espaco@exemplo.com")).toBe(
      "Não insira espaços!"
    );
    expect(wrapper.vm.regrasEmail[2]("testeespaco@exemplo.com ")).toBe(
      "Não insira espaços!"
    );
  });

  it("mostra mensagem de erro se senha estiver vazia", () => {
    expect(wrapper.vm.regrasSenha[0]("")).toBe("Insira uma senha!");
  });

  it("mostra mensagem de erro se senha for menor de 8 caracteres", () => {
    expect(wrapper.vm.regrasSenha[1]("1234657")).toBe(
      "Senha deve conter pelo menos 8 caracteres!"
    );
    expect(wrapper.vm.regrasSenha[1]("ABCDEFG")).toBe(
      "Senha deve conter pelo menos 8 caracteres!"
    );
  });

  it("mostra mensagem de erro se senha conter espaço", () => {
    expect(wrapper.vm.regrasSenha[2](" 12345678")).toBe("Não insira espaços!");
    expect(wrapper.vm.regrasSenha[2]("123456 78")).toBe("Não insira espaços!");
    expect(wrapper.vm.regrasSenha[2]("12345678 ")).toBe("Não insira espaços!");
  });

  it("mostra mensagem de erro se os dados de email e senha estiverem vazio", async () => {
    wrapper.find(".botao").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.regrasEmail[0]("")).toBe("Insira um email!");
    expect(wrapper.vm.regrasSenha[0]("")).toBe("Insira uma senha!");
  });

  it("desabilita o form quando o botao de logar é clicado", async () => {
    expect(wrapper.find(".botao").exists()).toBe(true);
    expect(wrapper.find(".loader").exists()).toBe(false);
    expect(wrapper.find(".email").attributes("disabled")).toBe("false");
    expect(wrapper.find(".senha").attributes("disabled")).toBe("false");

    const emailInput = wrapper.find(".email");
    const emailInputElement = emailInput.element;
    emailInputElement.value = "teste@email.com";
    await emailInputElement.dispatchEvent(new Event("input"));

    const senhaInput = wrapper.find(".senha");
    const senhaInputElement = senhaInput.element;
    senhaInputElement.value = "12345678";
    await senhaInputElement.dispatchEvent(new Event("input"));

    wrapper.find(".botao").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".botao").exists()).toBe(true);
    expect(wrapper.find(".loader").exists()).toBe(false);
    expect(wrapper.find(".email").attributes("disabled")).toBe("false");
    expect(wrapper.find(".senha").attributes("disabled")).toBe("false");
  });

  it("requisicao 401", async () => {
    mockAxios = new MockAdapter(axios);
    mockAxios.onPost("/autenticar").reply(401);

    const emailInput = wrapper.find(".email");
    const emailInputElement = emailInput.element;
    emailInputElement.value = "teste@teste.com";
    await emailInputElement.dispatchEvent(new Event("input"));

    const senhaInput = wrapper.find(".senha");
    const senhaInputElement = senhaInput.element;
    senhaInputElement.value = "12345678";
    await senhaInputElement.dispatchEvent(new Event("input"));

    wrapper.find(".botao").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".alerta .descricao").exists()).toBe(false);
  });

  it("requisicao 200", async () => {
    mockAxios = new MockAdapter(axios);
    mockAxios.onPost("/autenticar").reply(200);
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/admin" }],
    });

    const wrapper = mount(LoginView, {
      global: {
        plugins: [router],
        mocks: {
          $route: {
            path: "/admin",
          },
        },
      },
    });

    const emailInput = wrapper.find(".email");
    const emailInputElement = emailInput.element;
    emailInputElement.value = process.env.TESTE_EMAIL_LOGIN;
    await emailInputElement.dispatchEvent(new Event("input"));

    const senhaInput = wrapper.find(".senha");
    const senhaInputElement = senhaInput.element;
    senhaInputElement.value = process.env.TESTE_SENHA_LOGIN;
    await senhaInputElement.dispatchEvent(new Event("input"));

    wrapper.find(".botao").trigger("click");
    await wrapper.vm.$nextTick();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    expect(wrapper.vm.$route.path).toBe("/admin");
  });
});
