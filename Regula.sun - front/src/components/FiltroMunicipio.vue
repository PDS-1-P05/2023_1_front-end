<template>
    <div class="municipios">
        <p>Municípios (Máx. 5)</p>
        <v-autocomplete 
            no-data-text="Cidade(s) não encontrada(s)."
            v-model="municipiosSelecionados" 
            :items="municipios" 
            chips 
            closable-chips 
            multiple 
            :max="5" 
            :variant="null" 
            class="autocomplete"
            hide-details="true"
            :loading="loader"
        >
            <template v-slot:chip="{ props }">
                <v-chip 
                    v-bind="props"
                    style="font-size: 1.6rem; margin-right: 0.3rem; color: var(--corPrincipal)" 
                />
            </template>
            
            <template v-slot:item="{ props }">
                <v-list-item 
                    @click="selecionarItem(props.title)" 
                    class="itens"
                    :class="{ 'item-selecionado': itemSelecionado(props.title) }"
                >
                    {{ props.title }}
                </v-list-item>
            </template>
        </v-autocomplete>
        <AlertaInfo 
            class="alertaM" 
            v-if="alertaMunicipio" 
            mensagem="Selecione até 5 municípios" 
            :fechar="fecharAlertaMunicipios" 
        />
    </div>
</template>

<script>
import AlertaInfo from "../components/AlertaInfo.vue";

export default {
    name: "FiltroMunicipio",
    components: { AlertaInfo },
    props: {
        municipios: {
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
            municipiosSelecionados: [],
            alertaMunicipio: false,
            fecharAlerta: null,
        }
    },

    methods: {
        selecionarItem(item) {
            if (!this.municipiosSelecionados.includes(item)) {
                if (this.municipiosSelecionados.length < 5) {
                    this.municipiosSelecionados.push(item);
                } else {
                    this.alertaMunicipio = true;
                    setTimeout(() => {
                        this.fecharAlertaMunicipios();
                    }, 5000);
                }
            } else {
                const index = this.municipiosSelecionados.indexOf(item);
                this.municipiosSelecionados.splice(index, 1);
            }
        },

        itemSelecionado(item) {
            return this.municipiosSelecionados.includes(item);
        },

        fecharAlertaMunicipios() {
            this.alertaMunicipio = false;
        },
    }

}
</script>

<style scoped>
.municipios {
    margin-top: 2rem;
    width: 100%;
}
.municipios p {
    color: var(--pretoClaro);
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 1rem;
}

.alertaM {
    position: fixed;
    z-index: 101;
    right: 3rem;
    top: 5%;
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
    .municipios {
        width: 95vw;
        margin-bottom: 2rem;
    }
}
</style>