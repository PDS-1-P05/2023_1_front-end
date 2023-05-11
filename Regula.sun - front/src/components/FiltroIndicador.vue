<template>
    <div class="indicadores">
        <p>Indicadores (Máx. 10)</p>
        <v-autocomplete v-model="indicadoresSelecionados" :items="indicadores" chips closable-chips multiple :max="10">
            <template v-slot:chip="{ props, indicador }">
                <v-chip v-bind="props" :text="indicador"
                    style="font-size: 15px; margin-right: 3px; color: var(--corPrincipalEscura)" />
            </template>

            <template v-slot:item="{ props, indicador }">
                <v-list-item v-bind="props" :text="indicador" />
            </template>
        </v-autocomplete>
        <AlertaInfo class="alerta" v-if="alerta" mensagem="Selecione até 10 indicadores"
            :fechar="fecharAlertaIndicadores" />
    </div>
</template>

<script>
import { getIndicadores } from "../service/requisicao.js";
import { retornarDados } from "../utils/funcoes";
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "FiltroIndicador",
    components: { AlertaInfo },

    data() {
        return {
            indicadores: [],
            indicadoresSelecionados: [],
            alerta: false,
            fecharAlerta: null,
            temporizador: null,
        }

    },

    mounted() {
        this.returnIndicadores();

    },

    watch: {
        indicadoresSelecionados() {
            this.limiteMaxIndicadores();
        }
    },

    methods: {
        async returnIndicadores() {
            const jsonIndicadores = await getIndicadores();
            const indicadores = retornarDados(jsonIndicadores, "criterio");
            this.indicadores = indicadores;
            console.log(jsonIndicadores);

        },

        limiteMaxIndicadores() {
            if (this.indicadoresSelecionados.length > 10) {
                this.indicadoresSelecionados.pop();
                this.alerta = true;
                this.temporizador = setTimeout(() => {
                    this.fecharAlertaIndicadores();
                }, 5000);
            } else {
                this.alerta = false;
                clearTimeout(this.temporizador);

            }
        },

        fecharAlertaIndicadores() {
            this.alerta = false;
        }
    },

}
</script>

<style type="text/css">
.alerta {
    position: absolute;
    bottom: 95%;
}

.indicadores p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.indicadores {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
}

.item-indicador {
    margin: 0;
    padding: 0;
}
</style>