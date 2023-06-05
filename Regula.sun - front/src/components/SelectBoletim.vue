<template>
    <v-autocomplete class="seletor" :variant="solo" label="Selecione o município" bg-color="var(--corTerciariaClara)"
        :items="municipios"></v-autocomplete>
</template>

<script>

export default {
    name: "SelectBoletim",
    props: {
        municipios: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {

        }
    },

    methods: {

    },

}
</script>

<style type="text/css">
.seletor {
    color: var(--branco);
    width: 30rem;
    height: 1rem;
    border-radius: 5rem;
}

.seletor label {
    font-size: 1.6rem;
}
</style>