<template>
    <div class="container">
        <div>
            <DragNDrop titulo="Importar Indicadores" idInput="indicadores"></DragNDrop>
        </div>
        <div>
            <DragNDrop titulo="Importar Metas" idInput="metas"></DragNDrop>
        </div>
    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";
    import ImportButton from "@/components/ImportButton.vue";
    import DragNDrop from "../components/DragNDrop.vue";
    import VisualizacaoTabela from "../components/VisualizacaoTabela.vue";

    export default {
        name: "AdminView",

        data() {
            return {
                erroUpload: false,
                mostrarTabela: false,
            }
        },

        components: {
            ImportButton,
            DragNDrop,
            VisualizacaoTabela
        },

        mounted() {
            validarTokenAcesso().then((token) => {
                if (!token) {
                    router.push('/login');
                }
            })
        },

        methods: {
            arquivoExiste() {
                const file = this.$store.state.arquivoIndicadores;
                if (!file) {
                    this.erroUpload = true;
                } else {
                    this.erroUpload = false;
                    this.preVisualizarArquivo(file);
                }
            },

            preVisualizarArquivo(file) {
                setTimeout(() => {
                    this.emitter.emit('pre-visualizar', file);
                }, 100);
                this.mostrarTabela = true;
            },

        },
    }
</script>

<style scoped>
.container {
    margin-top: 8rem;
    margin: 0 4rem;
}
</style>