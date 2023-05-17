<template>
    <div class="municipios">
        <p>Municípios (Máx. 5)</p>
        <v-autocomplete v-model="municipiosSelecionados" :items="municipios" chips closable-chips multiple :max="5" :variant="null" class="autocomplete">
            <template v-slot:chip="{ props, municipio }">
                <v-chip 
                    v-bind="props" 
                    :text="municipio"
                    style="font-size: 1.6rem; margin-right: 0.3rem; color: var(--corPrincipal)" 
                />
            </template>

            <template v-slot:item="{ props, municipio }">
                <v-list-item v-bind="props" :text="municipio" style="font-size: 8rem"/>
            </template>
        </v-autocomplete>
        <AlertaInfo class="alertaM" v-if="alertaMunicipio" mensagem="Selecione até 5 municípios" :fechar="fecharAlertaMunicipios" />
    </div>
</template>

<script>
import { getMunicipios } from "../service/requisicao.js";
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
        this.returnMunicipios();
    },

    watch: {
        municipiosSelecionados() {
            this.limiteMaxMunicipios();

        }
    },

    methods: {
        async returnMunicipios() {
            const jsonMunicipios = await getMunicipios();
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

<style scoped>
.alertaM {
    position: absolute;
    right: 10rem;
    bottom: 75rem;
}

.municipios {
    margin-top: 3rem;
    width: 100%;
}

.municipios p {
    color: var(--pretoClaro);
    font-weight: bold;
    margin-bottom: 1rem;
}

.autocomplete{
    font-family: var(--fontePrincipal);
    border: 0.15rem solid var(--corTerciariaEscura);
    border-radius: 0.6rem;
}

@media (max-width: 720px) {
    .municipios {
        width: 95vw;
        margin-bottom: 2rem;
    }
}
</style>