<template>
    <div class="grafico">
        <canvas id="chartGrafico"></canvas>
    </div>
    <div class="exportar">
        <v-menu>
            <template v-slot:activator="{ props }">
                <button v-bind="props">Exportar Gráfico</button>
            </template>

            <v-list>
                <v-list-item class="lista" v-for="formato in formatos" :key="formato"  @click="exportarGrafico(formato)" >
                    <v-list-item-title class="itensLista"> {{ formato }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <button @click="exportarDados">Exportar Dados</button>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto';
    import { getCidades, getIndicadores } from "../service/requisicao";
    import domtoimage from 'dom-to-image-more';


    export default {
        name: "GraficoVue",

        props: {
            dados: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                formatos: ['.SVG', '.PNG'],
                dadosGrafico: [],
                dataAtual: "",
            }
        },

        created () {
            this.salvarCidadesIndicadores();
            
            setTimeout(() => {
                this.renderizarGrafico();
            }, 800);
        },

        methods: {
            async salvarCidadesIndicadores(){
                const cidades = await getCidades();
                const indicadores = await getIndicadores();
                this.$store.commit('armazenarCidades', cidades.data)
                this.$store.commit('armazenarIndicadores', indicadores.data)
            },

            retornarDataAtual(){
                var dataAtual = new Date();
                var dia = dataAtual.getDate();
                var mes = dataAtual.getMonth() + 1;
                var ano = dataAtual.getFullYear();
                var hora = dataAtual.getHours();
                var minutos = dataAtual.getMinutes();
                this.dataAtual = "Gerado em " + dia + "/" + mes + "/" + ano + " ás " + hora + ":" + minutos + ".";
            },

            renderizarGrafico() {
                this.retornarDataAtual();
                const grafico = document.getElementById('chartGrafico')
                const municipios = this.dados.map(municipio => this.getNomeCidade(municipio.idCidade));
                
                const colors = [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 255, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(128, 128, 128, 0.6)'
                ];

                const dadosReestruturados = {};
                this.dados.forEach(cidade => {
                    cidade.valoresIndicadores.forEach(indicador => {
                        if (!dadosReestruturados[indicador.idIndicador]) {
                            dadosReestruturados[indicador.idIndicador] = [];
                        }
                        dadosReestruturados[indicador.idIndicador].push(indicador.valorIndicador);
                    });
                });

                const chartData = {
                    labels: municipios,
                    datasets: Object.keys(dadosReestruturados).map((key, index) => ({
                        label: this.getNomeIndicador(parseInt(key)),
                        data: dadosReestruturados[key],
                        backgroundColor: colors[index % colors.length],
                    })),
                };

                this.dadosGrafico = chartData;

                const chartOptions = {
                    interaction: {
                        mode: 'index',
                        intersect: true,
                    },
                    
                    plugins: {
                        title: {
                            display: true,
                            text: 'Referente ao ano YYYY',
                        },
                        subtitle: {
                            display: true,
                            text: this.dataAtual,
                            position: 'bottom',
                            font: {
                                size: 14,
                                family: 'var(--fontePrincipal)',
                                style: 'italic'
                            },
                            padding: {
                                top: 20
                            }
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                };

                new Chart(grafico, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });

                
            },

            getNomeCidade(id) {
                return this.$store.getters.getNomeCidade(id)
            },

            getNomeIndicador(id) {
                return this.$store.getters.getNomeIndicador(id)
            },

            exportarGrafico(formato) {
                const grafico = document.getElementById('chartGrafico');

                if (formato === '.SVG') {
                    domtoimage.toSvg(grafico).then(function (dataUrl) {
                        const svgLink = document.createElement('a');
                        svgLink.href = dataUrl;
                        svgLink.download = 'grafico-indicadores-agems.svg';
                        svgLink.click();
                    })
                    .catch(function (error) {
                        console.error('Erro ao exportar gráfico como SVG:', error);
                    });

                } else if (formato === '.PNG') {
                    domtoimage.toPng(grafico).then(function (dataUrl) {
                        const pngLink = document.createElement('a');
                        pngLink.href = dataUrl;
                        pngLink.download = 'grafico-indicadores-agems.png';
                        pngLink.click();
                    })
                    .catch(function (error) {
                        console.error('Erro ao exportar gráfico como PNG:', error);
                    });
                }
                
            },

            exportarDados() {
                const labelsCidades = this.dadosGrafico.labels;
                const datasets = this.dadosGrafico.datasets;
                const cabecalho = ['Indicadores', labelsCidades].join(",")

                const linhasDados = datasets.map((dataset) => {
                    const indicador = dataset.label;
                    const valores = dataset.data.map((valor) => valor.toString());
                    return [indicador, valores].join(',');
                });
            
                const conteudoCSV = [cabecalho, ...linhasDados].join('\n');

                var csv = new Blob([conteudoCSV], { type: "text/csv" });
                var downloadLink = document.createElement("a");
                downloadLink.download = "dados-grafico-agems";
                downloadLink.href = window.URL.createObjectURL(csv);
                downloadLink.click();
            }

        },
    }
</script>

<style scoped>
.grafico {
    /* background-color: aqua; */
    width: 100%;
    height: 80rem;
    margin: auto;
    margin-top: 18rem;
}

.exportar {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.5rem;
    /* background-color: rgb(98, 255, 0); */
}

button {
    width: 15rem;
    height: 4rem;
    color: var(--branco);
    border-radius: 0.5rem;
    background-color: var(--corPrincipal);
    font-size: 1.6rem;
}

button:hover {
    background-color: var(--corPrincipalClara);
}

.itensLista {
    font-size: 1.4rem;
    font-family: var(--fonteSecundaria);
    text-align: center;
}

.lista:hover{
    background-color: var(--brancoClaro);
}
</style>