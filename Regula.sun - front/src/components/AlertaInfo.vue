<template>
    <div class="alerta" :style="{ backgroundColor: bgColor, color: textColor, width: widthAlerta }">
        <div class="mensagem" v-html="mensagem"></div>
        <button style="font-size: 1.4rem;" @click="fechar">
            <v-icon icon="mdi-window-close"></v-icon>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AlertaInfo',

        props: {
            mensagem: {
                type: String,
                required: true
            },
            bgColor: {
                type: String,
            },
            textColor: {
                type: String,
            },
            widthAlerta: {
                type: String,
            },
            fechar: Function
        },
    }
</script>

<style scoped>
.alerta {
    display: flex;
    width: 35rem;
    padding: 0.8rem;
    background-color: #F6E0E4;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    color: #B00020;
}

.alerta .mensagem {
    width: 90%;
    padding-left: 1rem;
}

.alerta > button {
    width: 10%;
    text-align: center;
}
</style>