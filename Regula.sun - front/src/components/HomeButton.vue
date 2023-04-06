<template>
    <button>
        {{  conteudo }}
    </button>
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
    
    button {
        width: 25.5rem;
        height: 5.5rem;

        color: var(--branco);
        background-color: var(--corSecundaria);
    }
</style>