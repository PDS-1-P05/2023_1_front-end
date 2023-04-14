<template>
    <div v-if="conteudo" id="btn-wrapper" data-test="btn-wrapper">
        <v-btn size="large" rounded="xl" id="btn-home" data-test="btn-home">
            {{ conteudo }}
        </v-btn>
    </div>
</template>

<script>

export default {
    props: {
        conteudo: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

#btn-wrapper {
    width: 100%;
}

#btn-home {
    color: var(--branco);
    background-color: var(--corSecundaria);

    width: 100%;
    max-width: 47rem;
}

</style>