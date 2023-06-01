<template>
    <div class="container">
        <div class="titulo">
            Filtros
        </div>
        <div class="anos">
            <p>Selecione um ano</p>
            <v-select v-model="anoSelecionado" :items="anos" :variant="null" class="select">
                <template v-slot:item="{ props }">
                    <v-list-item @click="selecionarItem(props.title)" class="itens"
                        :class="{ 'item-selecionado': itemSelecionado(props.title) }">
                        {{ props.title }}
                    </v-list-item>
                </template>
            </v-select>
        </div>
        <FiltroMunicipios ref="filtroMunicipio" class="filtroMunicipio" :loader="loaderMunicipios"
            :municipios="nomesMunicipios" />
        <FiltroIndicadores ref="filtroIndicador" :loader="loaderIndicadores" :indicadores="criteriosIndicadores" />
        <button @click="gerarGrafico">Gerar Gráfico</button>
        <GraficoComponent :dados="dadosGrafico" :anoSelecionado="String(anoSelecionado)" />
    </div>
</template>

<script>
import FiltroMunicipios from '@/components/FiltroMunicipio.vue';
import FiltroIndicadores from '@/components/FiltroIndicador.vue';
import GraficoComponent from '../components/GraficoComponent.vue';
import { getMunicipios, getIndicadores, getDadosGrafico } from "../service/requisicao";

export default {
    name: "GraficoView",
    components: {
        FiltroMunicipios,
        FiltroIndicadores,

        GraficoComponent,
    },

    data() {
        return {
            anoSelecionado: "",
            anos: [],
            dadosGrafico: [],
            loaderMunicipios: true,
            loaderIndicadores: true,
            nomesMunicipios: [],
            criteriosIndicadores: []
        }
    },

    created() {
        this.salvarMunicipiosIndicadores();
        const anoAtual = new Date().getFullYear();
        this.anos = Array.from(
            { length: anoAtual - 2022 + 1 },
            (_, i) => anoAtual - i
        );

        setTimeout(() => {
            this.graficoInicial();
        }, 1000);
    },

    methods: {
        async salvarMunicipiosIndicadores() {
            const municipios = await getMunicipios();
            const indicadores = await getIndicadores();
            if (municipios) {
                this.$store.commit('armazenarMunicipios', municipios.data)
                this.nomesMunicipios = this.$store.getters.getArrayNomeMunicipios();
                this.loaderMunicipios = false;

            }
            if (indicadores) {
                this.$store.commit('armazenarIndicadores', indicadores.data)
                this.criteriosIndicadores = indicadores.data;
                this.loaderIndicadores = false;
            }
        },

        async graficoInicial() {
            const retornarDados = await getDadosGrafico();
            if (retornarDados) {
                this.dadosGrafico = retornarDados.data;
            }
        },

        selecionarItem(item) {
            this.anoSelecionado = item;
        },

        itemSelecionado(item) {
            return this.anoSelecionado === item;
        },

        async gerarGrafico() {
            const anoSelecionado = this.anoSelecionado;
            const municipiosSelecionados = this.$refs.filtroMunicipio.municipiosSelecionados;
            const indicadoresSelecionados = this.$refs.filtroIndicador.indicadoresSelecionados;

            let dadosRequisicao = {
                ano: anoSelecionado,
                municipios: [],
                valoresIndicadores: []
            }

            if (anoSelecionado.length !== 0) {
                dadosRequisicao.ano =  anoSelecionado
            } else {
                delete dadosRequisicao.ano;
            }

            if (municipiosSelecionados.length !== 0) {
                municipiosSelecionados.forEach(municipio => {
                    dadosRequisicao.municipios.push(this.getIdMunicipio(municipio));
                });
            } else {
                delete dadosRequisicao.municipios;
            }

            if (indicadoresSelecionados.lenght !== 0) {
                indicadoresSelecionados.forEach(indicadores => {
                    dadosRequisicao.valoresIndicadores.push(this.getIdIndicador(indicadores));
                });
            } else {
                delete dadosRequisicao.valoresIndicadores;
            }

            const retornarDados = await getDadosGrafico(dadosRequisicao);
            this.dadosGrafico = retornarDados.data;
        },

        getIdMunicipio(nome) {
            return this.$store.getters.getIdMunicipio(nome)
        },

        getIdIndicador(nome) {
            return this.$store.getters.getIdIndicador(nome)
        },
    }
}
</script>

<style scoped>
button {
    width: 15rem;
    height: 4rem;
    color: var(--branco);
    border-radius: 0.5rem;
    background-color: var(--corPrincipal);
    font-size: 1.6rem;
}

button:hover {
    background-color: var(--corPrincipalClara);
}

.container {
    margin: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.titulo {
    font-weight: bold;
    font-size: 3rem;
    width: 100%;
    text-align: center;
}

.anos {
    width: 100%;
    text-align: start;
}

.anos p {
    color: var(--pretoClaro);
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 1rem;
}

.select {
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corPrincipalClara);
    border-radius: 0.6rem;
    height: 6rem;
}

.autocomplete {
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corTerciariaEscura);
    border-radius: 0.6rem;
}

.itens {
    font-size: 1.4rem;
}

.itens:hover {
    background-color: var(--brancoClaro);
}

.item-selecionado {
    background-color: var(--corPrincipalClara);
    color: var(--branco);
}

@media (max-width: 720px) {
    .anos {
        width: 95vw;
    }
}
</style>