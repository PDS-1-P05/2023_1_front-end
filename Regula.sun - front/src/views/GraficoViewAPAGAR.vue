<template>
    <div class="container">
        <div class="titulo">
            Filtros
        </div>
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
            <AlertaInfo class="alerta" v-if="alerta" mensagem="Limite máximo de municípios é 5."
                :fechar="fecharAlertaMunicipios" />
        </div>
    </div>
</template>

<script>
import { getCidades } from "../service/requisicao.js";
import { retornarDados } from "../utils/funcoes";
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "GraficoView",
    components: { AlertaInfo },

    data() {
        return {
            municipios: [],
            municipiosSelecionados: [],
            alerta: false,
            fecharAlerta: null,
        }
    },

    watch: {
        municipiosSelecionados() {
            this.limiteMax();
        }
    },

    mounted() {
        this.returnCidades();
    },

    methods: {
        async returnCidades() {
            const jsonCidades = await getCidades();
            const nome_cidade = retornarDados(jsonCidades, "nome");
            this.municipios = nome_cidade;

        },

        limiteMax() {
            if (this.municipiosSelecionados.length > 5) {
                this.municipiosSelecionados.pop();
                this.alerta = true;
            } else {
                this.alerta = false;
            }
        },

        fecharAlertaMunicipios() {
            this.alerta = false;
        }
    }

}
</script>

<style>
.container {
    margin: 10rem;
}

.titulo {
    font-weight: bold;
    font-size: 3rem;
    width: 100%;
    text-align: center;
}

.alerta {
    margin-top: 57vh;
}

.indicadores p,
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