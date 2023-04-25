<template>
    <div class="admin-view-wrapper">

        <AdminNavTab
            @altera-page="alteraTab"
            :tab="tab"
        >    
        </AdminNavTab>

        <v-window v-model="tab" id="window">
            <v-window-item value="Indicadores" class="window-item" >
                <DragNDrop titulo="Importar Indicadores" idInput="indicadores"></DragNDrop>

                <ImportButton conteudo="Importar Indicadores"></ImportButton>
            </v-window-item>

            <v-window-item value="Metas" class="window-item" >
                <DragNDrop titulo="Importar Metas" idInput="metas"></DragNDrop>

                <ImportButton conteudo="Importar Metas"></ImportButton>
            </v-window-item>
        </v-window>
    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";
    import ImportButton from "@/components/ImportButton.vue";
    import DragNDrop from "../components/DragNDrop.vue";
    import AdminNavTab from "@/components/AdminNavTab.vue"

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
            AdminNavTab
        },

        data() {
            return {
                tab: null,
            }
        },

        methods: {
            alteraTab(newPage) {
                this.tab = newPage
            }
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

<style  scoped>

.admin-view-wrapper {
    margin-top: 10rem;
    padding-inline: 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 12rem;
}

#window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.window-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 3rem;
}

</style>