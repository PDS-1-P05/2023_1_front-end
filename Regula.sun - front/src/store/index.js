import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    arquivoIndicadores: null,
    arquivoMetas: null,
    jsonIndicadores: null,
    jsonMetas: null,
    usuarioLogado: false,
  },

  actions: {
    atualizarUsuarioLogado({ commit }, logado) {
      commit("setLogado", logado);
    },
  },

  mutations: {
    setLogado(state, logado) {
      state.usuarioLogado = logado;
    },

    salvarIndicadores(state, arquivo) {
      state.arquivoIndicadores = arquivo;
    },

    salvarMetas(state, arquivo) {
      state.arquivoMetas = arquivo;
    },

    salvarJsonIndicadores(state, json) {
      state.jsonIndicadores = json;
    },

    salvarJsonMetas(state, json) {
      state.jsonMetas = json;
    },
  },
});
