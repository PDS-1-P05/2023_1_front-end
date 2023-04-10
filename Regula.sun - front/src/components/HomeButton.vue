<template>
    <v-btn size="large" rounded="xl" id="btn-home"> 
        {{ conteudo }}
    </v-btn>
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

#btn-home {
    color: var(--branco);
    background-color: var(--corSecundaria);

    width: 100%;
    max-width: 47rem;
}

</style>