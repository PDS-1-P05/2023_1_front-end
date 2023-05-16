<template>
    <div class="container">
        <div class="titulo">
            Filtros
        </div>
        <FiltroMunicipios ref="filtroMunicipio" />
        <FiltroIndicadores ref="filtroIndicador" />
        <DefaultButton conteudo="Gerar Gráfico" @click="geraGrafico" />
        <GraficoVue :dados="dados" />
    </div>
</template>

<script>
import FiltroMunicipios from '@/components/FiltroMunicipio.vue';
import FiltroIndicadores from '@/components/FiltroIndicador.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import GraficoVue from '../components/GraficoVue.vue';

export default {
    name: "GraficoView",
    components: {
        FiltroMunicipios,
        FiltroIndicadores,
        DefaultButton,
        GraficoVue
    },

    methods: {
        geraGrafico() {
            const municipiosSelecionados = this.$refs.filtroMunicipio.municipiosSelecionados;
            const indicadoresSelecionados = this.$refs.filtroIndicador.indicadoresSelecionados;
            console.log(municipiosSelecionados);
            console.log(indicadoresSelecionados);
        }
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
</style>