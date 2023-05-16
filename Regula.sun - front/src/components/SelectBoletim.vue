<template>
        <v-autocomplete
            class="seletor"
            :variant="solo"
            label="Selecione o município"
            bg-color="var(--corTerciariaClara)"
            :items="items"
            :rounded="true"
        ></v-autocomplete>
</template>

<script>
import { getCidades } from "../service/requisicao.js";
import { retornarDados } from "../utils/funcoes";

export default {
    name: "SelectBoletim", 

    data() {
        return {
            items: ''
        }
        
    },

    mounted() {
        this.returnCidades();

    },
    methods: {
        async returnCidades() {
            const jsonCidades = await getCidades();
            const cidades = retornarDados(jsonCidades, "nome");
            this.items = cidades;
            
        }
    },
    
}
</script>

<style type="text/css">
.seletor{
    color:var(--branco);
    width: 30rem;
    height: 1rem;
    border-radius: 5rem;
    
}
.seletor label{
    font-size: 1.6rem;
 
}


</style>