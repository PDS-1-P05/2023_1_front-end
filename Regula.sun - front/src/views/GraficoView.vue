<template>
    <div class="container">
        <div class="filtros">
            Filtros
        </div>
        <FiltroMunicipios />
        <FiltroIndicadores />
    </div>
</template>

<script>
import FiltroMunicipios from '@/components/FiltroMunicipio.vue';
import FiltroIndicadores from '@/components/FiltroIndicador.vue';

export default {
    name: "GraficoView",
    components: {
        FiltroMunicipios,
        FiltroIndicadores,
    },

    data() {
        return {
            municipiosSelecionados: [],
            indicadoresSelecionados: [],
        }
    },

}
</script>

<style>
.container {
    margin: 10rem;
}

.filtros {
    font-weight: bold;
    font-size: 3rem;
    width: 100%;
    text-align: center;
}
</style>