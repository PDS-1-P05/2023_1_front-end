<template>
    <div class="informativo">
        <h3>Clicar em qualquer legenda permite ocultar/mostrar os dados no gráfico referentes ao indicador</h3>
    </div>
    <div class="grafico-wrapper">
        <div class="grafico">
            <canvas id="chartGrafico"></canvas>
        </div>
    </div>
    <div class="exportar">
        <v-menu>
            <template v-slot:activator="{ props }">
                <button v-bind="props">Exportar Gráfico</button>
            </template>

            <v-list>
                <v-list-item class="lista" v-for="formato in formatos" :key="formato" @click="exportarGrafico(formato)">
                    <v-list-item-title class="itensLista"> {{ formato }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <button @click="exportarDados">Exportar Dados</button>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import domtoimage from 'dom-to-image-more';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

export default {
    name: "GraficoComponent",

    props: {
        dados: {
            type: Array,
            required: true
        },
        anoSelecionado: {
            type: String,
            required: true
        },
    },

    data() {
        return {
            chart: null,
            formatos: ['.SVG', '.PNG'],
            dadosRequest: [],
            dadosGrafico: [],
            dataAtual: "",
            anoRefente: "",
        }
    },

    watch: {
        dados(novosDados) {
            this.dadosRequest = [];
            this.dadosRequest = novosDados;
            this.ajustarDados();
        },

        anoSelecionado(ano) {
            this.anoRefente = ano;
        }
    },

    methods: {
        retornarDataAtual() {
            var dataAtual = new Date();
            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth() + 1;
            var ano = dataAtual.getFullYear();
            var hora = dataAtual.getHours();
            var minutos = dataAtual.getMinutes();
            if (mes < 10) { mes = "0" + mes; }
            if (dia < 10) { dia = "0" + dia; }
            if (hora < 10) { hora = "0" + hora; }
            if (minutos < 10) { minutos = "0" + minutos; }
            if (this.anoRefente === "") { this.anoRefente = ano; }

            this.dataAtual = "Gerado em " + dia + "/" + mes + "/" + ano + " às " + hora + ":" + minutos;
        },

        ajustarDados() {
            this.retornarDataAtual();
            const municipios = this.dadosRequest.map(municipio => this.getNomeMunicipio(municipio.idMunicipio));
            const dadosReestruturados = {};
            this.dadosRequest.forEach(municipio => {
                municipio.valoresIndicadores.forEach(indicador => {
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
                    backgroundColor: this.coresGrafico(index),
                })),
            };

            this.dadosGrafico = chartData;
            this.renderizarGrafico(chartData);
        },

        getNomeMunicipio(id) {
            return this.$store.getters.getNomeMunicipio(id)
        },

        getNomeIndicador(id) {
            return this.$store.getters.getNomeIndicador(id)
        },

        coresGrafico(index) {
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

            return colors[index];
        },

        renderizarGrafico(chartData) {
            if (this.chart) {
                this.chart.destroy();
            }

            const grafico = document.getElementById('chartGrafico');

            this.chart = new Chart(grafico, {
                type: 'bar',
                data: chartData,
                options: this.configuracaoGrafico()
            });


        },

        configuracaoGrafico() {
            const chartOptions = {
                interaction: {
                    mode: 'index',
                    intersect: true,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Referente ao ano ' + this.anoRefente,
                        font: { size: 14 },
                        padding: { top: 20 },
                    },
                    subtitle: {
                        display: true,
                        text: this.dataAtual,
                        position: 'top',
                        padding: { bottom: 50, top: 10 },
                    },
                    legend: {
                        position: 'bottom',
                        labels: { pointStyle: 'circle', usePointStyle: true },

                    },
                    datalabels: {
                        anchor: 'end', align: 'end', color: 'black',
                        font: { weight: 'bold' },
                    },
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Unidade de medida: " + this.$store.state.uniMedidaGrafico,
                            font: { size: 14 },
                            padding: { bottom: 15 }
                        }
                    },
                    x: {
                        ticks: { padding: 20 }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'x',
                barPercentage: 1
            };

            return chartOptions;
        },

        exportarGrafico(formato) {
            const grafico = document.getElementById('chartGrafico');

            if (formato === '.SVG') {
                domtoimage.toSvg(grafico)
                    .then((url) => {
                        const svgLink = document.createElement('a');
                        svgLink.href = url;
                        svgLink.download = 'grafico-indicadores-agems.svg';
                        svgLink.click();
                    }).catch((error) => {
                        console.error('Erro ao exportar gráfico como SVG:', error);
                    });
            } else if (formato === '.PNG') {
                domtoimage.toPng(grafico).then((url) => {
                    const pngLink = document.createElement('a');
                    pngLink.href = url;
                    pngLink.download = 'grafico-indicadores-agems.png';
                    pngLink.click();
                }).catch((error) => {
                    console.error('Erro ao exportar gráfico como PNG:', error);
                });
            }

        },

        exportarDados() {
            const labelsMunicipios = this.dadosGrafico.labels;
            const datasets = this.dadosGrafico.datasets;
            const cabecalho = ['Indicadores', labelsMunicipios].join(",")

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
        },


    },
}
</script>

<style scoped>
.informativo {
    margin-top: 4rem;
    width: 90vw;
    color: var(--corPrincipal);
    text-align: center;
}

.grafico-wrapper {
    width: 100vw;
    overflow-x: auto;
    margin: 2rem 0;
}

.grafico {
    width: 150rem;
    height: 60rem;
    margin: auto;
    padding: 2rem;
}

.exportar {
    display: flex;
    gap: 3rem;
    margin: 1.5rem;
}

button {
    width: 15rem;
    height: 4rem;
    color: var(--branco);
    border-radius: 0.5rem;
    background-color: var(--corPrincipal);
    font-size: 1.6rem;
    margin-bottom: 5rem;
}

button:hover {
    background-color: var(--corPrincipalClara);
}

.itensLista {
    font-size: 1.4rem;
    font-family: var(--fonteSecundaria);
    text-align: center;
}

.lista:hover {
    background-color: var(--brancoClaro);
}

@media (max-width: 800px) {
    .grafico {
        margin: 0.2rem;
    }
}

@media (max-width: 450px) {
    .exportar {
        gap: 1rem
    }
}
</style>