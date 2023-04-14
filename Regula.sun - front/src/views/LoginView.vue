<template>
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round" rel="stylesheet">

    <div class="container">
        <div class="area-login">
            <h1>Login</h1>
            <v-form ref="form" @submit.prevent="validate()">
                <div class="input">
                    <label class="label" for="email">Email:</label>
                    <v-text-field 
                        required
                        :disabled="formDesabilitado"
                        :variant="null"
                        class="email" 
                        prepend-inner-icon="mdi-email-outline"
                        placeholder="email@exemplo.com"
                        :rules="regrasEmail"
                        v-model="email">
                    </v-text-field>
                </div>
                <div class="input">
                    <label class="label" for="senha">Senha:</label>
                    <v-text-field
                        required
                        :disabled="formDesabilitado"
                        :variant="null"
                        class="senha"
                        prepend-inner-icon="mdi-key-outline"
                        placeholder="•••••••••"
                        :rules="regrasSenha"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                        @click:append="showPassword = !showPassword"
                        v-model="senha">
                    </v-text-field>
                </div>
                <div class="alerta" v-if="alerta">
                    <div class="descricao">
                        <v-icon icon="mdi-alert-circle-outline"></v-icon>
                        <h3> {{ mensagemAlerta }}</h3>
                    </div>
                    <div class="fecharAlerta">
                        <v-btn 
                            style="font-size: 1.4rem;"
                            variant="text"
                            icon="mdi-window-close"
                            @click="this.alerta = false"
                        ></v-btn>
                    </div>
                </div>
                <div class="loader" v-if="this.formDesabilitado">
                    <v-progress-circular
                        indeterminate
                    ></v-progress-circular>
                </div>
                <div v-if="this.btnLogar">
                    <button class="botao" type="submit">Logar</button>
                </div>
            </v-form>
        </div>
        <div class="area-imagem">
            <img src="src\assets\imagem_login.svg" alt="Paisagem de MS">
        </div>
    </div>
</template>

<script>
    import sjcl from 'sjcl';
    import { fazerLogin, validarTokenAcesso } from "../service/autenticacao.js";
    import router from "@/router";

    export default {
        name: "LoginView", 

        data() {
            return {
                email: '',
                senha: '',
                showPassword: false,
                regrasEmail: [
                    (v) => !!v || "Insira um email!",
                    (v) => /...+@..+\...+/.test(v) || "E-mail precisa ser válido!",
                    (v) => !/[ ]/.test(v) || "Não insira espaços!",
                ],
                regrasSenha: [
                    (v) => !!v || "Insira uma senha!",
                    (v) => (v && v.length >= 8) || "Senha deve conter pelo menos 8 caracteres!",
                    (v) => !/[ ]/.test(v) || "Não insira espaços!",
                ],
                valid: true,
                formDesabilitado: false,
                btnLogar: true,
                alerta: false,
                mensagemAlerta: '',
            }
        },

        mounted() {
            validarTokenAcesso().then((token) => {
                if (token) {
                    router.push('/admin');
                }
            })
        },

        methods:{
            async validate() {
                const { valid } = await this.$refs.form.validate()
                if ( valid ) {
                    this.autenticar();
                }
            },

            async autenticar() {
                this.formDesabilitado = true;
                this.btnLogar = false;
                this.alerta = false;

                const dadosLogin = {
                    email: this.criptografarDado(this.email),
                    senha: this.criptografarDado(this.senha)
                }

                const requisicao = await fazerLogin(dadosLogin);
                if (requisicao === 200) {
                    this.formDesabilitado = false;
                    this.btnLogar = true;
                    router.push("/admin");
                } else {
                    this.tratarErroRequisicao(requisicao);
                }
            },

            criptografarDado(dado) {
                const bitArray = sjcl.hash.sha256.hash(dado);
                const hash = sjcl.codec.hex.fromBits(bitArray);
                return hash;
            },

            tratarErroRequisicao(requisicao) {
                this.formDesabilitado = false;
                this.btnLogar = true;
                const status = requisicao.request.status;
                if (status === 401) {
                    this.mensagemAlerta = "Usuário/Senha inválido!"
                    this.alerta = true;
                } else if (status === 500) {
                    this.mensagemAlerta = "Ops! Ocorreu algum problema interno no servidor!"
                    this.alerta = true;
                } else {
                    this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
                    this.alerta = true;
                }
            }
        }

    }
</script>

<style scoped>
.container {
    margin-top: -5rem; 
    height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}
.area-login {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
}
.area-login h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
}
.area-imagem {
    width: 60%;
}
.input {
    margin: 3rem 0;
    display: flex;
    flex-direction: column;
}
.label {
    align-self: start;
    font-size: 1.8rem;
}
.email, .senha, .botao {
    width: 35rem;
    height: 5rem;
    color: var(--preto);
    border-radius: 0.5rem;
}
.email, .senha {
    background-color: var(--branco);
    border: 1px solid var(--brancoClaro);
    padding-right: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
}
.alerta {
    width: 35rem;
    display: flex;
    background-color: #F6E0E4;
    border-radius: 0.5rem;
    color: #B00020;
}
.alerta > .descricao  {
    width: 85%;
    display: flex;
    align-items: center;
    padding: 1rem;
}
.alerta > .descricao > h3 {
    padding-left: 1rem;
    font-size: 1.6rem;
}
.alerta > .fecharAlerta  {
    width: 15%;
    border-radius: 0.5rem;
    align-self: center;
}
.loader {
    color: var(--corPrincipal);
    text-align: center;
    size: 30rem;
    margin-bottom: 2.5rem;
}
.botao {
    margin-top: 1rem;
    background-color: var(--corPrincipal);
    text-align: center;
    color: var(--branco);
    font-size: 2rem;
}

img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
}

@media (max-width: 900px) {
    .area-login {
        width: 100%;
    }

    .area-imagem {
        display: none;
    }
}
</style>