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
        <AlertaInfo class="alertaM" v-if="alertaMunicipio" mensagem="Selecione até 5 municípios"
            :fechar="fecharAlertaMunicipios" />
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
            alertaMunicipio: false,
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
                this.alertaMunicipio = true;
                this.temporizador = setTimeout(() => {
                    this.fecharAlertaMunicipios();
                }, 5000);
            } else {
                this.alertaMunicipio = false;
                clearTimeout(this.temporizador);
            }
        },

        fecharAlertaMunicipios() {
            this.alertaMunicipio = false;
            console.log();
        },

        mostrarMunicipiosSelecionados() {
            alert(`Municípios selecionados: ${this.municipiosSelecionados.join(", ")}`);
        }
    }

}
</script>

<style>
.alertaM {
    position: absolute;
    right: 10rem;
    bottom: 75rem;
}

/* .alertaM {
    position: absolute;
    right: 10rem;
    bottom: 40rem;
} */

/* .alertaM {
    position: absolute;
    right: 8%;
    bottom: 70%;
} */

.municipios p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.municipios {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    width: 100%;
}
</style>