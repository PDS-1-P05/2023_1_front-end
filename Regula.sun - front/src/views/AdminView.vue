<template>
    <div class="container">
        <ImportButton
            conteudo="Importar Indicadores"
        >
        </ImportButton>
    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";
    import ImportButton from "@/components/ImportButton.vue";

    export default {
        name: "AdminView",

        components: {
            ImportButton
        },

        mounted() {
            validarTokenAcesso().then((token) => {
                if (!token) {
                    router.push('/login');
                }
            })
        },
    }
</script>

<style  scoped>
.container {
    margin-top: 8rem;
    margin-left: 2rem;
}
</style>