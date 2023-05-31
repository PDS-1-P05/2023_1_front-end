<template>
    <div>
        <AlertaInfo class="alertas" v-if="erroTemplateAno" :mensagem="mensagemAno" :fechar="fecharErroAno"></AlertaInfo>
        <AlertaInfo class="alertas" v-if="erroTemplateMunicipios" :mensagem="mensagemMunicipios" widthAlerta="50%" :fechar="fecharErroMunicipios"></AlertaInfo>
        <AlertaInfo class="alertas" v-if="erroTemplateIndicadores"  :mensagem="mensagemIndi" widthAlerta="80%" :fechar="fecharErroIndicadores"></AlertaInfo>
    </div>
    <div class="tabela" v-if="this.$store.state.mostrarTabelaMetas">
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
    import { processarArquivo, retornarColunas, validarTemplate } from "../utils/funcoes";
    import AlertaInfo from "./AlertaInfo.vue"

    export default {
        name: "VisualizacaoMetas",

        components: {
            AlertaInfo,
        },

        data() {
            return {
                colunas: [],
                linhas: [],
                mensagemAno: "",
                mensagemMunicipios: "",
                mensagemIndi: "",
                erroTemplateAno: false,
                erroTemplateMunicipios: false,
                erroTemplateIndicadores: false,
                mostrarMetas: false,
            };
        },

        created () {
            this.emitter.on("visualizar-metas", () => { this.lerArquivo() });
        },

        methods: {
            lerArquivo() {
                let arquivo = this.$store.state.arquivoMetas;
                const reader = new FileReader();
                reader.readAsText(arquivo);
                reader.onload = () => {
                   this.validarTemplate(reader.result);
                };
            },

            async validarTemplate(arquivo) {
                const json = processarArquivo(arquivo);
                this.$store.commit("salvarJsonMetas", json);
                const validar = await validarTemplate(json, 'metas');
                if (validar.ano && validar.municipios && validar.indicadores) {
                    this.mostrarDados(json);
                } else {
                    this.retornarAno(validar);
                    this.retornarMunicipios(validar);
                    this.retornarIndicadores(validar);
                    this.mostrarMetas = false;
                    this.$store.commit("mostrarTabelaMetas", false);
                }
            },

            mostrarDados(json) {
                this.colunas = retornarColunas(json.meta.fields);
                this.linhas = json.data;
                this.erroTemplateAno = false;
                this.erroTemplateMunicipios = false;
                this.erroTemplateIndicadores = false;
                this.$store.commit("mostrarTabelaMetas", true);
            },

            retornarAno(validar) {
                if (!validar.ano) {
                    this.mensagemAno = "Não existe a coluna 'Ano'";
                    this.erroTemplateAno = true;
                    setTimeout(() => {
                        this.fecharErroAno();
                    }, 5000);
                }
            },

            retornarMunicipios(validar) {
                if (!validar.municipios) {
                    this.mensagemMunicipios = "Municipios a mais: " + validar.cidEmAcrescimo + "<br>Municipios faltantes: " + validar.cidFaltando + "<br>Municipios fora de ordem: " + validar.cidForaOrdem;
                    this.erroTemplateMunicipios = true;
                    setTimeout(() => {
                        this.fecharErroMunicipios();
                    }, 5000);
                }
            },

            retornarIndicadores(validar) {
                if (!validar.indicadores) {
                    this.mensagemIndi = "Indicadores a mais: " + validar.indEmAcrescimo + "<br><br>" + "Indicadores faltantes: " + validar.indFaltando + "<br><br>" + "Indicadores fora de ordem: " + validar.indForaOrdem;
                    this.erroTemplateIndicadores = true;
                    setTimeout(() => {
                        this.fecharErroIndicadores();
                    }, 5000);
                }
            },

            fecharErroAno(){
                this.erroTemplateAno = false;
            },

            fecharErroMunicipios(){
                this.erroTemplateMunicipios = false;
            },
            
            fecharErroIndicadores(){
                this.erroTemplateIndicadores = false;
            },
        },
    }
</script>

<style scoped>
.alerta {
    margin: auto;
    margin-bottom: 0.2rem;
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