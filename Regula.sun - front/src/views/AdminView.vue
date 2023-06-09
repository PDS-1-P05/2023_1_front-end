<template>
    <div class="admin-view-wrapper">

        <AdminNavTab @altera-page="alteraTab" :tab="tab">
        </AdminNavTab>

        <v-window v-model="tab" id="window">
            <v-window-item value="Indicadores" class="window-item">
                <DragNDrop titulo="Importar Indicadores" idInput="indicadores"></DragNDrop>

                <AlertaInfo v-if="alertaUploadIndicadores" mensagem="Insira um arquivo para fazer Upload!"
                    :fechar="fecharAlertUpIndi">
                </AlertaInfo>

                <DefaultButton conteudo="Pré-Visualizar" @click="arquivoExisteIndicadores" v-if="preVisualizarIndi">
                </DefaultButton>

                <div class="wrapper-tabela">
                    <VisualizacaoIndicadores></VisualizacaoIndicadores>
                </div>

                <DefaultButton conteudo="Importar Dados" v-if="this.$store.state.mostrarTabelaIndi"
                    @click="enviarIndicadores">
                </DefaultButton>

                <div class="loader" v-if="this.loaderIndicadores">
                    <v-progress-circular indeterminate></v-progress-circular>
                </div>

                <AlertaInfo v-if="alertaRequisicaoIndicadores" :mensagem="mensagemRequisicaoIndicadores"
                    :bgColor="bgAlertaReqIndi" :textColor="colorReqIndi" :fechar="fecharAlertReqIndi">
                </AlertaInfo>

            </v-window-item>

            <v-window-item value="Metas" class="window-item">
                <DragNDrop titulo="Importar Metas" idInput="metas"></DragNDrop>

                <AlertaInfo v-if="alertaUploadMetas" mensagem="Insira um arquivo para fazer Upload!"
                    :fechar="fecharAlertUpMeta"></AlertaInfo>

                <DefaultButton conteudo="Pré-Visualizar" @click="arquivoExisteMetas" v-if="preVisualizarMetas">
                </DefaultButton>

                <div class="wrapper-tabela">
                    <VisualizacaoMetas></VisualizacaoMetas>
                </div>

                <DefaultButton conteudo="Importar Dados" v-if="this.$store.state.mostrarTabelaMetas" @click="enviarMetas">
                </DefaultButton>

                <div class="loader" v-if="this.loaderMetas">
                    <v-progress-circular indeterminate></v-progress-circular>
                </div>

                <AlertaInfo v-if="alertaRequisicaoMetas" :mensagem="mensagemRequisicaoMetas" :bgColor="bgAlertaReqMetas"
                    :textColor="colorReqMetas" :fechar="fecharAlertReqMeta">
                </AlertaInfo>

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
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "AdminView",

    data() {
        return {
            tab: null,
            alertaUploadIndicadores: false,
            alertaUploadMetas: false,
            preVisualizarIndi: true,
            preVisualizarMetas: true,
            alertaRequisicaoIndicadores: false,
            alertaRequisicaoMetas: false,
            mensagemRequisicaoIndicadores: '',
            mensagemRequisicaoMetas: '',
            bgAlertaReqIndi: '',
            colorReqIndi: '',
            bgAlertaReqMetas: '',
            colorReqMetas: '',
            loaderIndicadores: false,
            loaderMetas: false,
        }
    },

    components: {
        DefaultButton,
        DragNDrop,
        AdminNavTab,
        VisualizacaoIndicadores,
        VisualizacaoMetas,
        AlertaInfo
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
                setTimeout(() => {
                    this.fecharAlertUpIndi();
                }, 5000);
            } else {
                this.alertaUploadIndicadores = false;
                setTimeout(() => {
                    this.emitter.emit('visualizar-indicadores');
                }, 100);
            }
        },

        arquivoExisteMetas() {
            let arquivo = this.$store.state.arquivoMetas;
            if (!arquivo) {
                this.alertaUploadMetas = true;
                setTimeout(() => {
                    this.fecharAlertUpMeta();
                }, 5000);
            } else {
                this.alertaUploadMetas = false;
                setTimeout(() => {
                    this.emitter.emit('visualizar-metas');
                }, 100);
            }
        },

        async enviarIndicadores() {
            this.loaderIndicadores = true;
            this.preVisualizarIndi = false;
            this.$store.commit('mostrarTabelaIndicadores', false);
            let json = this.$store.state.jsonIndicadores;
            const formatarJSON = formatarIndicadores(json);
            const requisicao = await importarIndicadores(formatarJSON);
            if (requisicao === 200) {
                this.tratarSucessoIndicadores();
            } else {
                this.tratarErroIndicadores(requisicao);
            }
        },

        async enviarMetas() {
            this.loaderMetas = true;
            this.preVisualizarMetas = false;
            this.$store.commit('mostrarTabelaMetas', false);
            let json = this.$store.state.jsonMetas;
            const formatarJSON = formatarMetas(json);
            const requisicao = await importarMetas(formatarJSON);
            if (requisicao === 200) {
                this.tratarSucessoMetas();
            } else {
                this.tratarErroMetas(requisicao);
            }
        },

        tratarSucessoIndicadores() {
            this.loaderIndicadores = false;
            this.preVisualizarIndi = true;
            this.$store.commit("salvarJsonIndicadores", null);
            this.bgAlertaReqIndi = 'var(--corSecundaria)',
                this.colorReqIndi = 'var(--branco)',
                this.mensagemRequisicaoIndicadores = 'Indicadores importados com sucesso!';
            this.alertaRequisicaoIndicadores = true;
            setTimeout(() => {
                this.fecharAlertReqIndi();
            }, 5000);
        },

        tratarSucessoMetas() {
            this.loaderMetas = false;
            this.preVisualizarMetas = true;
            this.$store.commit("salvarJsonMetas", null);
            this.bgAlertaReqMetas = 'var(--corSecundaria)',
                this.colorReqMetas = 'var(--branco)',
                this.mensagemRequisicaoMetas = 'Metas importadas com sucesso!';
            this.alertaRequisicaoMetas = true;
            setTimeout(() => {
                this.fecharAlertReqMeta();
            }, 5000);
        },

        tratarErroIndicadores(status) {
            this.loaderIndicadores = false;
            this.preVisualizarIndi = true;
            this.bgAlertaReqIndi = '';
            this.colorReqIndi = '';
            if (status === 400) {
                this.mensagemRequisicaoIndicadores = 'Falha ao efetuar requisição!';
            } else if (status === 500) {
                this.mensagemRequisicaoIndicadores = 'Ops! Ocorreu algum problema interno no servidor!';
            } else {
                this.mensagemRequisicaoIndicadores = 'Um erro inesperado aconteceu, busque suporte!';
            }
            this.alertaRequisicaoIndicadores = true;
            setTimeout(() => {
                this.fecharAlertReqIndi();
            }, 5000);
        },

        tratarErroMetas(status) {
            this.loaderMetas = false;
            this.preVisualizarMetas = true;
            this.bgAlertaReqMetas = '';
            this.colorReqMetas = '';
            if (status === 400) {
                this.mensagemRequisicaoMetas = 'Falha ao efetuar requisição!';
            } else if (status === 500) {
                this.mensagemRequisicaoMetas = 'Ops! Ocorreu algum problema interno no servidor!';
            } else {
                this.mensagemRequisicaoMetas = 'Um erro inesperado aconteceu, busque suporte!';
            }
            this.alertaRequisicaoMetas = true;
            setTimeout(() => {
                this.fecharAlertReqMeta();
            }, 5000);
        },

        fecharAlertUpIndi() {
            this.alertaUploadIndicadores = false;
        },

        fecharAlertUpMeta() {
            this.alertaUploadMetas = false;
        },

        fecharAlertReqIndi() {
            this.alertaRequisicaoIndicadores = false;
        },

        fecharAlertReqMeta() {
            this.alertaRequisicaoMetas = false;
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

.wrapper-tabela {
    width: 80vw;
}
</style>