<template>
    <div>
        <AlertaInfo class="alerta" v-if="erroTemplateValores" :mensagem="mensagemValores" widthAlerta="100%" :fechar="fecharErroValores"></AlertaInfo>
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
    import { processarArquivo, retornarColunas, validarTemplate, validarValoresNulos } from "../utils/funcoes";
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
                mensagemValores: "",
                mensagemAno: "",
                mensagemMunicipios: "",
                mensagemIndi: "",
                erroTemplateValores: false,
                erroTemplateAno: false,
                erroTemplateMunicipios: false,
                erroTemplateIndicadores: false,
            };
        },

        created () {
            let arquivo = this.$store.state.arquivoMetas;
            if (arquivo) {  
                this.lerArquivo()
            }
            
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
                const template = await validarTemplate(json, 'metas');
                const valoresNulos = validarValoresNulos(json, 'Metas');
                if (template.ano && template.municipios && template.indicadores && !valoresNulos) {
                    this.mostrarDados(json);
                } else {
                    this.retornarValoresNulos(valoresNulos);
                    this.retornarAno(template);
                    this.retornarMunicipios(template);
                    this.retornarIndicadores(template);
                    this.$store.commit("mostrarTabelaMetas", false);
                }
            },

            mostrarDados(json) {
                this.colunas = retornarColunas(json.meta.fields);
                this.linhas = json.data;
                this.erroTemplateValores = false;
                this.erroTemplateAno = false;
                this.erroTemplateMunicipios = false;
                this.erroTemplateIndicadores = false;
                this.$store.commit("mostrarTabelaMetas", true);
            },

            retornarValoresNulos(valoresNulos) {
                if (valoresNulos) {
                    this.mensagemValores = valoresNulos;
                    this.erroTemplateValores = true
                    setTimeout(() => {
                        this.fecharErroValores();
                    }, 8000);
                }
            },

            retornarAno(template) {
                if (!template.ano) {
                    this.mensagemAno = "Não existe a coluna 'Ano'";
                    this.erroTemplateAno = true;
                    setTimeout(() => {
                        this.fecharErroAno();
                    }, 8000);
                }
            },

            retornarMunicipios(template) {
                if (!template.municipios) {
                    this.mensagemMunicipios = "Municipios a mais: " + template.cidEmAcrescimo + "<br>Municipios faltantes: " + template.cidFaltando + "<br>Municipios fora de ordem: " + template.cidForaOrdem;
                    this.erroTemplateMunicipios = true;
                    setTimeout(() => {
                        this.fecharErroMunicipios();
                    }, 8000);
                }
            },

            retornarIndicadores(template) {
                if (!template.indicadores) {
                    this.mensagemIndi = "Indicadores a mais: " + template.indEmAcrescimo + "<br><br>" + "Indicadores faltantes: " + template.indFaltando + "<br><br>" + "Indicadores fora de ordem: " + template.indForaOrdem;
                    this.erroTemplateIndicadores = true;
                    setTimeout(() => {
                        this.fecharErroIndicadores();
                    }, 8000);
                }
            },

            fecharErroValores(){
                this.erroTemplateValores = false;
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