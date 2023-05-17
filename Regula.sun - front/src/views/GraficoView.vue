<template>
    <div class="container">
        <div class="titulo">
            Filtros
        </div>
        <div class="anos">
            <p>Selecione um ano</p>
            <v-select v-model="anoSelecionado" :items="anos" :variant="null" class="select"/>
        </div>
        <FiltroMunicipios ref="filtroMunicipio" />
        <FiltroIndicadores ref="filtroIndicador" />
        <DefaultButton conteudo="Gerar Gráfico" @click="gerarGrafico" />
        <GraficoComponent :dados="dadosGrafico"/>
    </div>
</template>

<script>
import FiltroMunicipios from '@/components/FiltroMunicipio.vue';
import FiltroIndicadores from '@/components/FiltroIndicador.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import GraficoComponent from '../components/GraficoComponent.vue';
import { getMunicipios, getIndicadores, getDadosGrafico } from "../service/requisicao";

export default {
    name: "GraficoView",
    components: {
        FiltroMunicipios,
        FiltroIndicadores,
        DefaultButton,
        GraficoComponent
    },

    data() {
        return {
            anoSelecionado: null,
            anos: [],
            dadosGrafico: [],
        }
    },

    created() {
        this.salvarMunicipiosIndicadores();
        const anoAtual = new Date().getFullYear();
        this.anos = Array.from(
            { length: anoAtual - 2000 + 1 },
            (_, i) => anoAtual - i
        );
        
        setTimeout(() => {
            this.graficoInicial();
        }, 500);
    },

    methods: {
        async salvarMunicipiosIndicadores() {
            const municipios = await getMunicipios();
            const indicadores = await getIndicadores();
            this.$store.commit('armazenarMunicipios', municipios.data)
            this.$store.commit('armazenarIndicadores', indicadores.data)
        },

        async graficoInicial() {
            const retornarDados = await getDadosGrafico();
            this.dadosGrafico = retornarDados.data;
        }, 

        async gerarGrafico() {
            const anoSelecionado = this.anoSelecionado;
            const municipiosSelecionados = this.$refs.filtroMunicipio.municipiosSelecionados;
            const indicadoresSelecionados = this.$refs.filtroIndicador.indicadoresSelecionados;

            const dadosRequisicao = {
                ano: anoSelecionado,
                municipios: [],
                valoresIndicadores: []
            }

            municipiosSelecionados.forEach(municipio => {
                dadosRequisicao.municipios.push(this.getIdMunicipio(municipio));
            });

            indicadoresSelecionados.forEach(indicadores => {
                dadosRequisicao.valoresIndicadores.push(this.getIdIndicador(indicadores));
            });

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
    text-align: start;
    width: 100%;
}

p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.select {
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corTerciariaEscura);
    border-radius: 0.6rem;
    height: 6rem;
}

@media (max-width: 720px) {
    .anos {
        width: 95vw;
    }
}
</style>