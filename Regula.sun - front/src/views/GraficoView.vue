<template>
    <div class="container">
        <GraficoVue :dados="dados"/>
    </div>
</template>

<script>
    import GraficoVue from '../components/GraficoVue.vue';

    export default {
        name: 'GraficoView',
        
        components: { GraficoVue },

        data() {
            return {
                dados: 
                [
                    {
                        "idCidade": 45,
                        "valoresIndicadores": [
                            {
                                "idIndicador": 5,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 9,
                                "valorIndicador": 2
                            },
                            {
                                "idIndicador": 15,
                                "valorIndicador": 3
                            },
                            {
                                "idIndicador": 20,
                                "valorIndicador": 4
                            },
                            {
                                "idIndicador": 34,
                                "valorIndicador": 5
                            },
                            {
                                "idIndicador": 11,
                                "valorIndicador": 6
                            },
                            {
                                "idIndicador": 1,
                                "valorIndicador": 7
                            },
                            {
                                "idIndicador": 2,
                                "valorIndicador": 8
                            },
                            {
                                "idIndicador": 7,
                                "valorIndicador": 9
                            },
                            {
                                "idIndicador": 13,
                                "valorIndicador": 10
                            }
                        ]
                    },
                    {
                        "idCidade": 37,
                        "valoresIndicadores": [
                            {
                                "idIndicador": 5,
                                "valorIndicador": 10
                            },
                            {
                                "idIndicador": 9,
                                "valorIndicador": 9
                            },
                            {
                                "idIndicador": 15,
                                "valorIndicador": 8
                            },
                            {
                                "idIndicador": 20,
                                "valorIndicador": 7
                            },
                            {
                                "idIndicador": 34,
                                "valorIndicador": 6
                            },
                            {
                                "idIndicador": 11,
                                "valorIndicador": 5
                            },
                            {
                                "idIndicador": 1,
                                "valorIndicador": 4
                            },
                            {
                                "idIndicador": 2,
                                "valorIndicador": 3
                            },
                            {
                                "idIndicador": 7,
                                "valorIndicador": 2
                            },
                            {
                                "idIndicador": 13,
                                "valorIndicador": 1
                            }
                        ]
                    },
                    {
                        "idCidade": 4,
                        "valoresIndicadores": [
                            {
                                "idIndicador": 5,
                                "valorIndicador": 4
                            },
                            {
                                "idIndicador": 9,
                                "valorIndicador": 8
                            },
                            {
                                "idIndicador": 15,
                                "valorIndicador": 14
                            },
                            {
                                "idIndicador": 20,
                                "valorIndicador": 19
                            },
                            {
                                "idIndicador": 34,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 11,
                                "valorIndicador": 10
                            },
                            {
                                "idIndicador": 1,
                                "valorIndicador": 0
                            },
                            {
                                "idIndicador": 2,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 7,
                                "valorIndicador": 6
                            },
                            {
                                "idIndicador": 13,
                                "valorIndicador": 12
                            }
                        ]
                    },
                    {
                        "idCidade": 79,
                        "valoresIndicadores": [
                            {
                                "idIndicador": 5,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 9,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 15,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 20,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 34,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 11,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 1,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 2,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 7,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 13,
                                "valorIndicador": 1
                            }
                        ]
                    },
                    {
                        "idCidade": 55,
                        "valoresIndicadores": [
                            {
                                "idIndicador": 5,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 9,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 15,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 20,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 34,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 11,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 1,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 2,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 7,
                                "valorIndicador": 1
                            },
                            {
                                "idIndicador": 13,
                                "valorIndicador": 1
                            }
                        ]
                    }
                ]
            }
        },
    }
</script>

<style scoped>
.container {
    margin-top: 6rem;
}
</style>