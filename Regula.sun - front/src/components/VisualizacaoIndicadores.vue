<template>
    <div class="tabela">
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
    import { processarArquivo, retornarColunas } from "../utils/funcoes";

    export default {
        name: "VisualizacaoIndicadores",

        data() {
            return {
                colunas: [],
                linhas: [],
            };
        },

        created () {
            this.emitter.on("visualizar-indicadores", () => { this.mostrarDados() });
        },

        methods: {
            mostrarDados() {
                let arquivo = this.$store.state.arquivoIndicadores;
                const reader = new FileReader();
                reader.readAsText(arquivo);
                reader.onload = () => {
                    const json = processarArquivo(reader.result);
                    this.$store.commit("salvarJsonIndicadores", json);
                    this.colunas = retornarColunas(json.meta.fields);
                    this.linhas = json.data;
                };
            }
        },
    }
</script>

<style scoped>
.tabela{
    border: 0.2rem solid var(--pretoClaro);
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