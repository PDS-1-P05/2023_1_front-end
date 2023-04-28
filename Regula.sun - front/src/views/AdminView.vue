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
                
                <DefaultButton conteudo="Importar Dados" v-if="mostrarTabelaIndicadores" @click="enviarIndicadores"></DefaultButton>
            
                <div class="loader" v-if="this.loaderIndicadores">
                    <v-progress-circular
                        indeterminate
                    ></v-progress-circular>
                </div>
                <div class="erroUpload" v-show="alertaRequisicaoIndicadores">
                    <div class="mensagemErro">
                        <span>{{ this.mensagemRequisicaoIndicadores}}</span>
                    </div>

                    <button style="font-size: 1.4rem;" @click="this.alertaRequisicaoIndicadores = false">
                        <v-icon icon="mdi-window-close"></v-icon>
                    </button>
                </div>

            </v-window-item>

            <v-window-item value="Metas" class="window-item" >
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

                <DefaultButton conteudo="Importar Dados" v-if="mostrarTabelaMetas" @click="enviarMetas"></DefaultButton>
                
                <div class="loader" v-if="this.loaderMetas">
                    <v-progress-circular
                        indeterminate
                    ></v-progress-circular>
                </div>
                <div class="erroUpload" v-show="alertaRequisicaoMetas">
                    <div class="mensagemErro">
                        <span>{{ this.mensagemRequisicaoMetas}}</span>
                    </div>

                    <button style="font-size: 1.4rem;" @click="this.alertaRequisicaoMetas = false">
                        <v-icon icon="mdi-window-close"></v-icon>
                    </button>
                </div>

            </v-window-item>
        </v-window>

    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import { importarIndicadores, importarMetas } from "../service/requisicao.js"
    import { formatarIndicadores, formatarMetas } from "../utils/funcoes";
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
                loaderIndicadores: false,
                loaderMetas: false,
                alertaRequisicaoIndicadores: false,
                alertaRequisicaoMetas: false,
                mensagemRequisicaoIndicadores: '',
                mensagemRequisicaoMetas: '',
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
            alteraTab(newPage) {
                this.tab = newPage
            },

            arquivoExisteIndicadores() {
                let arquivo = this.$store.state.arquivoIndicadores;
                if (!arquivo) {
                    this.alertaUploadIndicadores = true;
                } else {
                    this.alertaUploadIndicadores = false;  
                    setTimeout(() => {
                        this.emitter.emit('visualizar-indicadores');
                    }, 100);
                    this.mostrarTabelaIndicadores = true;   
                }
            },

            arquivoExisteMetas() {
                let arquivo = this.$store.state.arquivoMetas;
                if (!arquivo) {
                    this.alertaUploadMetas = true;
                } else {
                    this.alertaUploadMetas = false;
                    setTimeout(() => {
                        this.emitter.emit('visualizar-metas');
                    }, 100);
                    this.mostrarTabelaMetas = true;
                }
            },

            async enviarIndicadores() {
                this.loaderIndicadores = true;
                this.mostrarTabelaIndicadores = false;
                let json = this.$store.state.jsonIndicadores;
                const formatarJSON = formatarIndicadores(json);
                const requisicao = await importarIndicadores(formatarJSON);
                if (requisicao === 200) {
                    this.tratarSucessoIndicadores();
                } else {
                    this.tratarErroIndicadores(requisicao.status);
                }
            },

            async enviarMetas() {
                this.loaderMetas = true;
                this.mostrarTabelaMetas = false;
                let json = this.$store.state.jsonMetas;
                const formatarJSON = formatarMetas(json);
                const requisicao = await importarMetas(formatarJSON);
                if (requisicao === 200) {
                    this.tratarSucessoMetas();
                } else {
                    this.tratarErroMetas(requisicao.request.status);
                }
            },

            tratarSucessoIndicadores() {
                this.loaderIndicadores = false;
                this.$store.commit("salvarJsonIndicadores", null);
                this.mensagemRequisicaoIndicadores = 'Indicadores importados com sucesso!';
                this.alertaRequisicaoIndicadores = true;
            },

            tratarSucessoMetas() {
                this.loaderMetas = false;
                this.$store.commit("salvarJsonMetas", null);
                this.mensagemRequisicaoMetas = 'Metas importados com sucesso!';
                this.alertaRequisicaoMetas = true;
            },

            tratarErroIndicadores(status) {
                this.loaderIndicadores = false;
                if (status === 400) {
                    this.mensagemRequisicaoIndicadores = 'Erro 400';
                } else if (status === 500) {
                    this.mensagemRequisicaoIndicadores = 'Ops! Ocorreu algum problema interno no servidor!';
                } else {
                    this.mensagemRequisicaoIndicadores = 'Um erro inesperado aconteceu, busque suporte!';
                }
                this.alertaRequisicaoIndicadores = true;
            },
  
            tratarErroMetas(status) {
                this.loaderMetas = false;
                if (status === 400) {
                    this.mensagemRequisicaoMetas = 'Erro 400';
                } else if (status === 500) {
                    this.mensagemRequisicaoMetas = 'Ops! Ocorreu algum problema interno no servidor!';
                } else {
                    this.mensagemRequisicaoMetas = 'Um erro inesperado aconteceu, busque suporte!';
                }
                this.alertaRequisicaoMetas = true;
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

.erroUpload > button {
    width: 10%;
    text-align: center;
}

.wrapper-tabela {
    width: 80vw;
}

</style>