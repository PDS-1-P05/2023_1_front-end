<template>
    <div class="alerta">
        <AlertaInfo v-if="mostrarErro" :mensagem="mensagemErro" widthAlerta="100%" :fechar="fecharMensagemErro"></AlertaInfo>
    </div>
    <div class="tabela" v-if="this.$store.state.mostrarTabelaIndi">
        <v-table fixed-header height="80rem" data-test="teste">
            <thead>
                <tr>
                    <th v-for="coluna in colunas" :key="coluna" style="text-align: center; width: 5000px;">{{ coluna.value }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="linha in linhas" :key="linha.value">
                    <td v-for="(value, key) in linha" :key="key">{{ value }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
    import * as Funcoes from "../utils/funcoes";
    import AlertaInfo from "./AlertaInfo.vue"

    export default {
        name: "VisualizacaoIndicadores",

        components: {
            AlertaInfo,
        },

        data() {
            return {
                colunas: [],
                linhas: [],
                mensagemErro: "",
                mostrarErro: false,
            };
        },

        created() {
            let arquivo = this.$store.state.arquivoIndicadores;
            if (arquivo) {  
                this.lerArquivo()
            }

            this.emitter.on("visualizar-indicadores", () => { this.lerArquivo() });
        },

        methods: {
            lerArquivo() {
                let arquivo = this.$store.state.arquivoIndicadores;
                const reader = new FileReader();
                reader.readAsText(arquivo);
                reader.onload = () => {
                   this.validarTemplate(reader.result);
                };
            },

            async validarTemplate(arquivo) {
                const json = Funcoes.processarArquivo(arquivo);
                this.$store.commit("salvarJsonIndicadores", json);
                const templateBanco = await Funcoes.retornarTemplateBanco();
                const templateArquivo = Funcoes.templateIndiArquivo(json);
                const municipiosValidos = Funcoes.validarMunicipios(templateArquivo, templateBanco);
                const indicadoresValidos = Funcoes.validarIndicadores(templateArquivo, templateBanco);
                const valoresNulos = Funcoes.validarValoresNulos(json, 'Indicadores');

                if (municipiosValidos.valido && indicadoresValidos.valido && !valoresNulos) {
                    this.mostrarDados(json)
                } else {
                    this.$store.commit('mostrarTabelaIndicadores', false)
                    this.retornarInvalidez(municipiosValidos, indicadoresValidos, valoresNulos);
                }
            },

            mostrarDados(json) {
                this.colunas = Funcoes.retornarColunas(json.meta.fields);
                this.linhas = json.data;
                this.mostrarErro = false;
                this.$store.commit('mostrarTabelaIndicadores', true);
            },

            retornarInvalidez(municipiosValidos, indicadoresValidos, valoresNulos) {
                if (!municipiosValidos.valido && !indicadoresValidos.valido) {
                    this.mensagemErro = "Verifique o arquivo, dados inválidos."
                    this.mostrarErro = true;
                    setTimeout(() => {
                        this.fecharMensagemErro();
                    }, 8000);
                } else if (!municipiosValidos.valido) {
                    this.retornarMunicipios(municipiosValidos);
                } else if (!indicadoresValidos.valido) {
                    this.retornarIndicadores(indicadoresValidos);
                } else if (valoresNulos) {
                    this.retornarValoresNulos(valoresNulos)
                }
            },

            retornarMunicipios(template) {
                if (!template.valido) {
                    this.mensagemErro = "Municipios a mais: " + template.cidEmAcrescimo + "<br><br>" + "Municipios faltantes: " + template.cidFaltando + "<br><br>" + "Municipios fora de ordem: " + template.cidForaOrdem;
                    this.mostrarErro = true;
                    setTimeout(() => {
                        this.fecharMensagemErro();
                    }, 8000);
                }
            },

            retornarIndicadores(template) {
                if (!template.valido) {
                    this.mensagemErro = "Indicadores a mais: " + template.indEmAcrescimo + "<br><br>" + "Indicadores faltantes: " + template.indFaltando + "<br><br>" + "Indicadores fora de ordem: " + template.indForaOrdem;
                    this.mostrarErro = true;
                    setTimeout(() => {
                        this.fecharMensagemErro();
                    }, 8000);
                }
            },

             retornarValoresNulos(valoresNulos) {
                if (valoresNulos) {
                    this.mensagemErro = valoresNulos;
                    this.mostrarErro = true
                    setTimeout(() => {
                        this.fecharMensagemErro();
                    }, 8000);
                }
            },

            fecharMensagemErro(){
                this.mostrarErro = false;
            },

        },
    }
</script>

<style scoped>
.alerta {
    margin: auto;
    margin-bottom: 0.2rem;
    width: 70vw;
}
.tabela{
    border: 0.1rem solid var(--pretoClaro);
    border-radius: 0.5rem;
}

thead {
    position: sticky;
    top: 0;
    z-index: 2;
    font-size: 1.4rem;
}

tbody {
    font-size: 1.4rem;
    text-align: center;
}

tbody td:first-child {
    text-align: start;
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: var(--branco);
}
</style>