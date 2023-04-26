<template>
    <button id="default-button" v-if="conteudo">
        {{ conteudo }}
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

<style>

#default-button {    
    color: var(--branco);
    background-color: var(--corPrincipalClara);
    
    font-family: var(--fonteSecundaria);
    font-size: 1rem;
    font-weight: 600;
    
    border: none;
    border-radius: 0.5rem;
    
    min-height: 2.5rem;
    height: 10vw;
    max-height: 4.7rem;
    
    min-width: fit-content;
    width: 40vw;
    max-width: 23rem;
    
    padding-inline: 1.5rem;
    
    box-shadow: 0rem 0.2rem 0.2rem 0rem var(--preto);

    transition: box-shadow 0.2s ease, background-color 0.2 ease;
}

#default-button:hover {
    background-color: #539aca;

    box-shadow: 0rem 0.2rem 0.5rem var(--preto);
}

#default-button:active {
    background-color: var(--corPrincipal);
}

@media screen and (min-width: 600px) {
  #default-button {
    font-size: 1.3rem;
  }
}

</style>