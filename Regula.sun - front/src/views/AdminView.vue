<template>
    <div class="container">
        <h3>Em desenvolvimento...</h3>
    </div>
</template>

<script>
    import { validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";

    export default {
        name: "AdminView",

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