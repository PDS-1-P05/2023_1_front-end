<template>
    <div class="indicadores">
        <p>Indicadores (Máx. 10)</p>
        <v-autocomplete v-model="indicadoresSelecionados" :items="indicadores" chips closable-chips multiple :max="10" :variant="null" class="autocomplete">
            <template v-slot:chip="{ props, indicador }">
                <v-chip 
                    v-bind="props" 
                    :text="indicador"
                    style="font-size: 1.6rem; margin-right: 0.3rem; color: var(--corPrincipal)" 
                />
            </template>

            <template v-slot:item="{ props, indicador }">
                <v-list-item v-bind="props" :text="indicador" />
            </template>
        </v-autocomplete>
        <AlertaInfo class="alertaI" v-if="alertaIndicador" mensagem="Selecione até 10 indicadores"
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
            alertaIndicador: false,
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
        },

        limiteMaxIndicadores() {
            if (this.indicadoresSelecionados.length > 10) {
                this.indicadoresSelecionados.pop();
                this.alertaIndicador = true;
                this.temporizador = setTimeout(() => {
                    this.fecharAlertaIndicadores();
                }, 5000);
            } else {
                this.alertaIndicador = false;
                clearTimeout(this.temporizador);

            }
        },

        fecharAlertaIndicadores() {
            this.alertaIndicador = false;
        }
    },

}
</script>

<style scoped>
.alertaI {
    position: absolute;
    right: 10rem;
    bottom: 70rem;
}

.indicadores {
    width: 100%;
    margin: 2rem;
    height: auto
}

.indicadores p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.item-indicador {
    margin: 0;
    padding: 0;
}

.autocomplete{
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corTerciariaEscura);
    border-radius: 0.6rem;
}

@media (max-width: 720px) {
    .indicadores {
        width: 95vw;
        margin-bottom: 2rem;
    }
}

</style>