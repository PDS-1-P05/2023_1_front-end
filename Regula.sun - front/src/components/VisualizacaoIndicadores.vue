<template>
    <div>
        <AlertaInfo class="alerta" v-if="erroTemplateMunicipios" :mensagem="mensagemMunicipios" widthAlerta="50%" :fechar="fecharErroMunicipios"></AlertaInfo>
        <AlertaInfo class="alerta" v-if="erroTemplateIndicadores" :mensagem="mensagemIndi" widthAlerta="80%" :fechar="fecharErroIndicadores"></AlertaInfo>
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
    import { processarArquivo, retornarColunas, validarTemplate } from "../utils/funcoes";
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
                mensagemMunicipios: "",
                mensagemIndi: "",
                erroTemplateMunicipios: false,
                erroTemplateIndicadores: false,
            };
        },

        created () {
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
                const json = processarArquivo(arquivo);
                this.$store.commit("salvarJsonIndicadores", json);
                const validar = await validarTemplate(json, 'indicadores');
                if (validar.municipios && validar.indicadores) {
                    this.mostrarDados(json)
                } else {
                    this.retornarMunicipios(validar);
                    this.retornarIndicadores(validar);
                    this.$store.commit('mostrarTabelaIndicadores', false)
                }
            },

            mostrarDados(json) {
                this.colunas = retornarColunas(json.meta.fields);
                this.linhas = json.data;
                this.erroTemplateMunicipios = false;
                this.erroTemplateIndicadores = false;
                this.$store.commit('mostrarTabelaIndicadores', true);
            },

            retornarMunicipios(validar) {
                if (!validar.municipios) {
                    this.mensagemMunicipios = "Municipios a mais: " + validar.cidEmAcrescimo + "<br>Municipios faltantes: " + validar.cidFaltando + "<br>Municipios fora de ordem: " + validar.cidForaOrdem;
                    this.erroTemplateMunicipios = true;
                }
            },

            retornarIndicadores(validar) {
                if (!validar.indicadores) {
                    this.mensagemIndi = "Indicadores a mais: " + validar.indEmAcrescimo + "<br><br>" + "Indicadores faltantes: " + validar.indFaltando + "<br><br>" + "Indicadores fora de ordem: " + validar.indForaOrdem;
                    this.erroTemplateIndicadores = true;
                }
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