<template>
    <div class="admin-view-wrapper">

        <AdminNavTab @altera-page="alteraTab" :tab="tab">
        </AdminNavTab>

        <v-window v-model="tab" id="window">
            <v-window-item value="Indicadores" class="window-item">
                <DragNDrop titulo="Importar Indicadores" idInput="indicadores"></DragNDrop>

                <div class="erroUpload" v-show="erroUploadIndicadores">
                    <div class="mensagemErro">
                        <span>Insira um arquivo para fazer Upload!</span>
                    </div>

                    <button style="font-size: 1.4rem;" @click="this.erroUploadIndicadores = false">
                        <v-icon icon="mdi-window-close"></v-icon>
                    </button>
                </div>

                <DefaultButton conteudo="Pré-Visualizar" @click="arquivoExisteIndicadores"></DefaultButton>

                <div v-if="mostrarTabelaIndicadores" class="wrapper-tabela">
                    <VisualizacaoIndicadores></VisualizacaoIndicadores>
                </div>

                <DefaultButton conteudo="Importar Dados" v-if="mostrarTabelaIndicadores"></DefaultButton>

            </v-window-item>

            <v-window-item value="Metas" class="window-item">
                <DragNDrop titulo="Importar Metas" idInput="metas"></DragNDrop>

                <div class="erroUpload" v-show="erroUploadMetas">
                    <div class="mensagemErro">
                        <span>Insira um arquivo para fazer Upload!</span>
                    </div>

                    <button style="font-size: 1.4rem;" @click="this.erroUploadMetas = false">
                        <v-icon icon="mdi-window-close"></v-icon>
                    </button>
                </div>

                <DefaultButton conteudo="Pré-Visualizar" @click="arquivoExisteMetas"></DefaultButton>

                <div v-if="mostrarTabelaMetas" class="wrapper-tabela">
                    <VisualizacaoMetas></VisualizacaoMetas>
                </div>

                <DefaultButton conteudo="Importar Dados" v-if="mostrarTabelaMetas"></DefaultButton>

            </v-window-item>
        </v-window>

    </div>
</template>

<script>
import { validarTokenAcesso } from "../service/autenticacao.js";
import router from "@/router";
import DefaultButton from "@/components/DefaultButton.vue";
import DragNDrop from "../components/DragNDrop.vue";
import AdminNavTab from "@/components/AdminNavTab.vue"
import VisualizacaoIndicadores from "@/components/VisualizacaoIndicadores.vue"
import VisualizacaoMetas from "@/components/VisualizacaoMetas.vue"

export default {
    name: "AdminView",

    data() {
        return {
            tab: null,
            erroUploadIndicadores: false,
            erroUploadMetas: false,
            mostrarTabelaIndicadores: false,
            mostrarTabelaMetas: false,
        }
    },

    components: {
        DefaultButton,
        DragNDrop,
        AdminNavTab,
        VisualizacaoIndicadores,
        VisualizacaoMetas
    },

    mounted() {
        validarTokenAcesso().then((token) => {
            if (!token) {
                router.push('/login');
            }
        })
    },

    methods: {
        arquivoExisteIndicadores() {
            let arquivo = this.$store.state.arquivoIndicadores;
            if (!arquivo) {
                this.erroUploadIndicadores = true;
            } else {
                this.erroUploadIndicadores = false;
                setTimeout(() => {
                    this.emitter.emit('visualizar-indicadores');
                }, 100);
                this.mostrarTabelaIndicadores = true;
            }
        },

        arquivoExisteMetas() {
            let arquivo = this.$store.state.arquivoMetas;
            if (!arquivo) {
                this.erroUploadMetas = true;
            } else {
                this.erroUploadMetas = false;
                setTimeout(() => {
                    this.emitter.emit('visualizar-metas');
                }, 100);
                this.mostrarTabelaMetas = true;
            }
        },

        alteraTab(newPage) {
            this.tab = newPage
        }

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

    gap: 3rem;

    padding: 3rem;
}

.erroUpload {
    display: flex;
    width: 35rem;
    padding: 0.8rem;
    background-color: #F6E0E4;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    color: #B00020;
}

.erroUpload .mensagemErro {
    width: 90%;
}

.erroUpload>button {
    width: 10%;
    text-align: center;
}

.wrapper-tabela {
    width: 80vw;
}
</style>