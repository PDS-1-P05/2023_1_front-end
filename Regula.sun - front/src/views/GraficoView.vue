<template>
    <div class="container">
        <div class="titulo">
            Filtros
        </div>
        <div class="anos">
            <p>Selecione um ano</p>
            <v-select v-model="anoSelecionado" :items="anos" />
        </div>
        <FiltroMunicipios ref="filtroMunicipio" />
        <FiltroIndicadores ref="filtroIndicador" />
        <DefaultButton conteudo="Gerar Gráfico" @click="geraGrafico" />
        <GraficoComponent :dados="dadosGrafico" v-if="mostrarGrafico" />
    </div>
</template>

<script>
import FiltroMunicipios from '@/components/FiltroMunicipio.vue';
import FiltroIndicadores from '@/components/FiltroIndicador.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import GraficoComponent from '../components/GraficoComponent.vue';
import { getCidades, getIndicadores, getDadosGrafico } from "../service/requisicao";

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
            mostrarGrafico: false,
        }
    },

    created() {
        this.salvarCidadesIndicadores();
        const anoAtual = new Date().getFullYear();
        this.anos = Array.from(
            { length: anoAtual - 2000 + 1 },
            (_, i) => anoAtual - i
        );
    },

    methods: {
        async salvarCidadesIndicadores() {
            const cidades = await getCidades();
            const indicadores = await getIndicadores();
            this.$store.commit('armazenarCidades', cidades.data)
            this.$store.commit('armazenarIndicadores', indicadores.data)
        },

        getIdCidade(nome) {
            return this.$store.getters.getIdCidade(nome)
        },
        getIdIndicador(nome) {
            return this.$store.getters.getIdIndicador(nome)
        },

        async geraGrafico() {
            const anoSelecionado = this.anoSelecionado;
            const municipiosSelecionados = this.$refs.filtroMunicipio.municipiosSelecionados;
            const indicadoresSelecionados = this.$refs.filtroIndicador.indicadoresSelecionados;

            const dadosRequisicao = {
                ano: anoSelecionado,
                cidades: [],
                valoresIndicadores: []
            }

            municipiosSelecionados.forEach(municipio => {
                dadosRequisicao.cidades.push(this.getIdCidade(municipio));
            });

            indicadoresSelecionados.forEach(indicadores => {
                dadosRequisicao.valoresIndicadores.push(this.getIdIndicador(indicadores));
            });

            const retornarDados = await getDadosGrafico(dadosRequisicao);
            this.dadosGrafico = retornarDados.data;
            console.log(this.dadosGrafico)

            this.mostrarGrafico = true;
        }
    }
}
</script>

<style>
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
    display: flex;
    flex-direction: column;
    width: 100%;
}

p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}
</style>