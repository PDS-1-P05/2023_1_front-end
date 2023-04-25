import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    arquivoIndicadores: null,
    arquivoMetas: null,
  },

  mutations: {
    salvarIndicadores(state, arquivo) {
      state.arquivoIndicadores = arquivo;
    },

    salvarMetas(state, arquivo) {
      state.arquivoMetas = arquivo;
    },
  },
});
