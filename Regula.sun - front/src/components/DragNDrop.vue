<template>
    <div class="container">
        <div class="area-titulo">
            <h1>{{ titulo }}</h1>
        </div>
        <div class="area-upload">
            <div 
            @dragover.prevent
            @dragenter.prevent="alternarAtivo"
            @dragleave.prevent="alternarAtivo"
            @drop.prevent="alternarAtivo"
            @drop="submissaoDrop"
            :class="{'dropzone-ativo' : ativo}"
            class="dropzone">
                <div class="divLabels">
                    <label :for="idInput"><img src="../assets/imagem_upload.svg" alt="Importe seu arquivo!"></label>
                    <label id="primeira-label" :for="idInput">Selecione um arquivo CSV</label>
                    <label id="segunda-label" :for="idInput">ou arraste e solte para fazer upload</label>
                    <input ref="entradaArquivo" type="file" :id="idInput" class="dropzoneFile" @change="submissaoInput"/>
                </div>
                <div class="descricao" v-if="info">
                    <span>{{ descricao }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
        name: "DragNDropIndicadores",

        props: {
            titulo: {
                type: String,
                required: true  
            },
            idInput: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                descricao: '',
                info: false,
            }
        },

        setup() {
            const ativo = ref(false);

            const alternarAtivo = () => {
                ativo.value = !ativo.value;
            }

            return { ativo, alternarAtivo }
        },

        methods: {
            submissaoDrop(event) {
                const file = event.dataTransfer.files[0];
                this.validarArquivo(file);
            },

            submissaoInput() {
                const file = this.$refs.entradaArquivo.files[0]
                this.validarArquivo(file);
            },

            validarArquivo(arquivo) {
                if (arquivo) {
                    this.info = true;
                    if (arquivo.type !== 'text/csv') {
                        this.descricao = "Insira um arquivo válido!";
                    } else {
                        this.descricao = arquivo.name;
                        if (this.idInput === "indicadores") {
                            this.$store.commit("salvarIndicadores", arquivo);
                        } else if (this.idInput === "metas") {
                            this.$store.commit("salvarMetas", arquivo);
                        }
                    }
                }
                
            }
        }
    }
</script>

<style scoped>
.container {
    padding: 2rem 0rem;
}
.area-titulo {
    text-align: center;
    font-size: 1.3rem;
    font-style: var(--fontePrincipal);
    margin: 2rem 0;
}
.area-upload {
    display: flex;
    justify-content: center;
    
}
.dropzone {
    width: 75vw;
    max-width: 77rem;
    height: 22rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 0.2rem dashed var(--brancoClaro);
    border-radius: 1rem;
    font-style: var(--fonteSecundaria);
}
.divLabels {
    display: flex;
    flex-direction: column;
    text-align: center;
}
.divLabels > label > img {
    width: 7rem;
    height: 7rem;
    margin: 0 2rem;
}

#primeira-label {
    font-weight: bold;
    font-size: 1.6rem;
}

#segunda-label {
    font-size: 1.4rem;
    color: var(--brancoClaro);
}
.divLabels > input {
    display: none;
}
.descricao {
    margin: 1.2rem 0;
    padding: 0.2rem 1.2rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--corPrincipal);
}
.dropzone-ativo {
    border: 0.2rem solid var(--corPrincipal);
    transition: 0.3s ease all;
}
</style>