import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    arquivoIndicadores: null,
    arquivoMetas: null,
    jsonIndicadores: null,
    jsonMetas: null,
    usuarioLogado: false,
    mostrarTabelaIndi: false,
    mostrarTabelaMetas: false,
    indicadores: [],
    cidades: [],
    arquivoBoletim: null,
  },

  getters: {
    getNomeCidade: (state) => (idCidade) => {
      const cidade = state.cidades.find((cidade) => cidade.id === idCidade);
      return cidade ? cidade.nome : "";
    },
    getNomeIndicador: (state) => (idIndicador) => {
      const indicador = state.indicadores.find((indicador) => indicador.id === idIndicador);
      return indicador ? indicador.criterio : "";
    },
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

    mostrarTabelaIndicadores(state, valido) {
      state.mostrarTabelaIndi = valido;
    },

    mostrarTabelaMetas(state, valido) {
      state.mostrarTabelaMetas = valido;
    },

    armazenarCidades(state, cidades) {
      state.cidades = cidades;
    },

    armazenarIndicadores(state, indicadores) {
      state.indicadores = indicadores;
    },

    armazenarBoletins(state, arquivo) {
      state.arquivoBoletim = arquivo;
    }
  },
});
