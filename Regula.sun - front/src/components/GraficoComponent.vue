<template>
    <div class="grafico" >
        <canvas id="chartGrafico"></canvas>
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

export default {
    name: "GraficoComponent",

    props: {
        dados: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            chart: null,
            formatos: ['.SVG', '.PNG'],
            dadosRequest: [],
            dadosGrafico: [],
            dataAtual: "",
        }
    },

    watch: {
        dados(novosDados) {
            this.dadosRequest = [];
            this.dadosRequest = novosDados;
            this.ajustarDados();
        }
    },

    mounted() {
        this.ajustarDados();
    },

    methods: {
        retornarDataAtual() {
            var dataAtual = new Date();
            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth() + 1;
            var ano = dataAtual.getFullYear();
            var hora = dataAtual.getHours();
            var minutos = dataAtual.getMinutes();
            this.dataAtual = "Gerado em " + dia + "/" + mes + "/" + ano + " ás " + hora + ":" + minutos + ".";
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

            this.renderizarGrafico(chartData);
        },

        getNomeMunicipio(id) {
            return this.$store.getters.getNomeMunicipio(id)
        },

        getNomeIndicador(id) {
            return this.$store.getters.getNomeIndicador(id)
        },

        coresGrafico(index){
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
            const grafico = document.getElementById('chartGrafico').getContext('2d');
            this.dadosGrafico = chartData;

            this.chart = new Chart(grafico, {
                type: 'bar',
                data: chartData,
                options: this.configuracaoGrafico()
            });
        },

        onResize() {
            console.log('A')
        },

        configuracaoGrafico(){
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
                        },
                        padding: {
                            top: 20
                        }
                    },
                    legend: {
                        labels: {
                            font: function(context) {
                                if (window.innerWidth < 400) {
                                    return { size: 7 };
                                } else if (window.innerWidth < 500) {
                                    return { size: 8 };
                                }
                            },
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
            };

            return chartOptions;
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
.grafico {
    width: 100%;
    height: 70rem;
    margin-top: 2rem;
}

.exportar {
    display: flex;
    justify-content: space-evenly;
    /* justify-items: space-evenly; */
    margin-top: 1.5rem;
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

.lista:hover {
    background-color: var(--brancoClaro);
}

@media (max-width: 800px) {
    .grafico {
        width: 100vw;
        margin: 0 0.2rem;
    }
}
</style>