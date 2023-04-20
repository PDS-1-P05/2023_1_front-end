<template>
    <div class="container">
        <div>
            <DragNDrop titulo="Importar Indicadores" idInput="indicadores"></DragNDrop>
        </div>
        <div>
            <DragNDrop titulo="Importar Metas" idInput="metas"></DragNDrop>
        </div>
        <div>
            <ImportButton conteudo="Importar Indicadores"></ImportButton>
        </div>
    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";
    import ImportButton from "@/components/ImportButton.vue";
    import DragNDrop from "../components/DragNDrop.vue";

    export default {
        name: "AdminView",

        components: {
    ImportButton,
    DragNDrop
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