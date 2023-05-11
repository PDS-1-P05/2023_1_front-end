<template>
    <div class="municipios">
        <p>Municípios (Máx. 5)</p>
        <v-autocomplete v-model="municipiosSelecionados" :items="municipios" chips closable-chips multiple :max="5">
            <template v-slot:chip="{ props, municipio }">
                <v-chip v-bind="props" :text="municipio"
                    style="font-size: 15px; margin-right: 3px; color: var(--corPrincipalEscura)" />
            </template>

            <template v-slot:item="{ props, municipio }">
                <v-list-item v-bind="props" :text="municipio" />
            </template>
        </v-autocomplete>
        <AlertaInfo class="alerta" v-if="alerta" mensagem="Selecione até 5 municípios" :fechar="fecharAlertaMunicipios" />
    </div>
</template>

<script>
import { getCidades } from "../service/requisicao.js";
import { retornarDados } from "../utils/funcoes";
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "FiltroMunicipio",
    components: { AlertaInfo },

    data() {
        return {
            municipios: [],
            municipiosSelecionados: [],
            alerta: false,
            fecharAlerta: null,
            temporizador: null,
        }
    },

    mounted() {
        this.returnCidades();
    },

    watch: {
        municipiosSelecionados() {
            this.limiteMaxMunicipios();
        }
    },

    methods: {
        async returnCidades() {
            const jsonMunicipios = await getCidades();
            const nome_municipio = retornarDados(jsonMunicipios, "nome");
            this.municipios = nome_municipio;

        },

        limiteMaxMunicipios() {
            if (this.municipiosSelecionados.length > 5) {
                this.municipiosSelecionados.pop();
                this.alerta = true;
                this.temporizador = setTimeout(() => {
                    this.fecharAlertaMunicipios();
                }, 5000);
            } else {
                this.alerta = false;
                clearTimeout(this.temporizador);
            }
        },

        fecharAlertaMunicipios() {
            this.alerta = false;
        }
    }

}
</script>

<style>
.alerta {
    position: absolute;
}

.municipios p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.municipios {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
}
</style>