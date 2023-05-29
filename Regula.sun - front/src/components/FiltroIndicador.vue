<template>
    <div class="indicadores">
        <p>Indicadores (Máx. 10)</p>
        <v-autocomplete 
            v-model="indicadoresSelecionados"
            :items="this.indicadores"
            chips 
            closable-chips
            multiple 
            :max="10" 
            :variant="null" 
            class="autocomplete"
            hide-details="true"
            style=" color: var(--corPrincipal);"
            :loading="loader"
        >
            <template v-slot:chip="{ props }">
                <v-chip 
                    v-bind="props"
                    style="font-size: 1.6rem; margin-right: 0.3rem; color: var(--corPrincipal)" 
                />
            </template>

            <template v-slot:prepend-item>
                <div v-for="grupo in this.indicadoresAgrupados" :key="grupo.tipo">
                    <h4 style="font-size: 1.7rem; color: var(--corPrincipal); padding: 1rem; ">Categoria de {{ grupo.tipo }} </h4>
                    <v-divider></v-divider>
                    <v-list-item v-for="indicador in grupo.indicadores"
                        @click="selecionarItem(indicador.criterio)"
                        class="itens"
                        :class="{ 'item-selecionado': itemSelecionado(indicador.criterio)}"
                    >
                        {{ indicador.criterio }}
                    </v-list-item>
                    <v-divider v-if="grupo !== this.indicadoresAgrupados[this.indicadoresAgrupados.length - 1]"></v-divider>
                </div>
            </template>

            <template v-slot:item>
                <v-list-item v-for="indicador in this.indicadoresAgrupados.tipo">
                    {{ indicador.criterio }}
                </v-list-item>
            </template>
        </v-autocomplete>
        <AlertaInfo 
            class="alertaI" 
            v-if="alertaIndicador" 
            mensagem="Selecione até 10 indicadores" 
            :fechar="fecharAlertaIndicadores" 
        />
        <div class="informativo">
            <h3>É necessário que os indicadores selecionados sejam da mesma categoria</h3>
        </div>
        
    </div>
</template>

<script>
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "FiltroIndicador",
    components: { AlertaInfo },
    props: {
        indicadores: {
            type: Array,
            required: true 
        },
        loader: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {
            indicadoresAgrupados: [],
            indicadoresSelecionados: [],
            alertaIndicador: false,
            fecharAlerta: null,
        }
    },

    mounted() {
        setTimeout(() => {
            this.returnIndicadores();
        }, 1000); 
    },

    methods: {
        returnIndicadores() {
            this.agruparIndicadores();
        },

        agruparIndicadores(){
            const grupos = {};
            for (const indicador of this.indicadores) {
                const tipo = indicador.unidade_medida || "";
                if (!grupos[tipo]) {
                    grupos[tipo] = {
                        tipo: tipo,
                        indicadores: [],
                    };
                }
                grupos[tipo].indicadores.push(indicador);
            }
            this.indicadoresAgrupados = Object.values(grupos);
        },

        selecionarItem(item) {
            if (!this.indicadoresSelecionados.includes(item)) {
                if (this.indicadoresSelecionados.length < 10) {
                    if (this.indicadoresSelecionados.length === 0) {
                        this.indicadoresSelecionados.push(item);
                    } else {
                        this.validarUnidadeMedida(item);
                    }
                } else {
                    this.alertaIndicador = true;
                    setTimeout(() => {
                        this.fecharAlertaIndicadores();
                    }, 5000);
                }
            } else {
                const index = this.indicadoresSelecionados.indexOf(item);
                this.indicadoresSelecionados.splice(index, 1);
            }
        },

        validarUnidadeMedida(item) {
            let unidadePrimaria = this.getUnidadeMedida(this.indicadoresSelecionados[0]);
            let unidadeIndicadorSelecionado = this.getUnidadeMedida(item);
            if (unidadePrimaria !== unidadeIndicadorSelecionado) {
                console.log("UNIDADES DE MEDIDAS SAO DIFERENTES")

            } else {
                console.log("UNIDADES DE MEDIDAS SAO IGUAIS")
                this.indicadoresSelecionados.push(item);
            }
        },

        getUnidadeMedida(item) {
            let dadosIndicador = this.indicadores.filter((indicador) => indicador.criterio === item)
            return dadosIndicador[0].unidade_medida
        },

        itemSelecionado(item) {
            return this.indicadoresSelecionados.includes(item);
        },

        fecharAlertaIndicadores() {
            this.alertaIndicador = false;
        }
    },

}
</script>

<style scoped>
.informativo {
    margin-top: 0.5rem;
    color: var(--corPrincipal)
}
.indicadores {
    width: 100%;
    margin: 2rem;
    height: auto
}
.indicadores p {
    color: var(--pretoClaro);
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 1rem;
}
.alertaI {
    position: fixed;
    z-index: 101;
    right: 3rem;
    top: 10%;
}
.autocomplete{
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corPrincipalClara);
    border-radius: 0.6rem;
}
.itens {
    font-size: 1.4rem;
}
.itens:hover {
    background-color: var(--brancoClaro);
}
.item-selecionado {
    background-color: var(--corPrincipalClara);
    color: var(--branco);
}

@media (max-width: 720px) {
    .indicadores {
        width: 95vw;
        margin-bottom: 2rem;
    }
}

</style>