import Vuex from "vuex";
import axios from 'axios'

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
    arquivoBoletim: null,
    municipioEscolhido: null,
    municipios: [],
    ranking: [],
    uniMedidaGrafico: '',
  },

  getters: {
    getIdMunicipio: (state) => (nome) => {
      const municipio = state.municipios.find((municipio) => municipio.nome === nome);
      return municipio ? municipio.id : "";
    },

    getNomeMunicipio: (state) => (idMunicipio) => {
      const municipio = state.municipios.find((municipio) => municipio.id === idMunicipio);
      return municipio ? municipio.nome : "";
    },

    getIdIndicador: (state) => (nome) => {
      const indicador = state.indicadores.find((indicador) => indicador.criterio === nome);
      return indicador ? indicador.id : "";
    },

    getNomeIndicador: (state) => (idIndicador) => {
      const indicador = state.indicadores.find((indicador) => indicador.id === idIndicador);
      return indicador ? indicador.criterio : "";
    },

    getArrayNomeMunicipios: (state) => () => {
      const municipiosNomes = state.municipios.map((municipios) => municipios.nome);
      return municipiosNomes
    },

    getArrayCriterioIndicadores: (state) => () => {
      const criterioIndicadores = state.indicadores.map((indicadores) => indicadores.criterio);
      return criterioIndicadores
    },

    getUnidadeMedidaIndicador: (state) => (item) => {
      const indicador = state.indicadores.find((indicador) => indicador.criterio === item);
      return indicador ? indicador.unidade_medida : "";
    }
  },

  actions: {
    atualizarUsuarioLogado({ commit }, logado) {
      commit("setLogado", logado);
    },

    requisitarRanking({ commit }, url) {
      axios
      .get(url)
      .then((response) => {
        commit('requisitarRanking', response.data)
      })
    }
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

    armazenarMunicipios(state, municipios) {
      state.municipios = municipios;
    },

    armazenarIndicadores(state, indicadores) {
      state.indicadores = indicadores;
    },

    requisitarRanking(state, ranking) {
      state.ranking = ranking
    },
    
    armazenarBoletins(state, arquivo) {
      state.arquivoBoletim = arquivo;
    },

    salvarMunicipioSelecionado(state, municipio) {
      state.municipioEscolhido = municipio;
    },
    
    armazenarUniMedidaGrafico(state, unidadeMedida) {
      state.uniMedidaGrafico = unidadeMedida;
    },
  },
});
