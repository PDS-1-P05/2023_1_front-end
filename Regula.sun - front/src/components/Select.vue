<template>
    <v-autocomplete
    :variant="null"
    label="Autocomplete"
    :items="items"
    ></v-autocomplete>
</template>

<script>
    import { getCidades } from "../services/requisicoes.js";

    export default {
        name: "LoginView", 

        data() {
            return {
                items: "",
            }
        },

        mounted() {
            const requisicao = getCidades();
            this.items = requisicao;
        }
    }
</script>

<style lang="scss" scoped>


</style>