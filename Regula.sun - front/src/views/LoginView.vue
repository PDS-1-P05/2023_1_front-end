<template>
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round" rel="stylesheet">

    <div class="container">
        <div class="area-login">
            <div class="area-form">
                <h1>Login</h1>
                <v-form :disabled="formDesabilitado" ref="form" @submit.prevent="validate()">
                    <div class="input">
                        <label class="label" for="email">Email:</label>
                        <v-text-field required :variant="null" class="email" prepend-inner-icon="mdi-email-outline"
                            placeholder="email@exemplo.com" :rules="regrasEmail" v-model="email">
                        </v-text-field>
                    </div>
                    <div class="input">
                        <label class="label" for="senha">Senha:</label>
                        <v-text-field required :variant="null" class="senha" prepend-inner-icon="mdi-key-outline"
                            placeholder="•••••••••" :rules="regrasSenha" :type="showPassword ? 'text' : 'password'"
                            :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                            @click:append="showPassword = !showPassword" v-model="senha">
                        </v-text-field>
                    </div>
                    <AlertaInfo v-if="alerta" :mensagem="mensagemAlerta" :fechar="fecharAlerta"></AlertaInfo>
                    <div class="loader" v-if="this.formDesabilitado">
                        <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                    <div v-if="this.btnLogar">
                        <button class="botao" type="submit">Logar</button>
                    </div>
                </v-form>
            </div>
        </div>
        <div class="area-imagem">
            <img src="@/assets/imagem_login.svg" alt="Paisagem de MS">
        </div>
    </div>
</template>

<script>
import sjcl from 'sjcl';
import { fazerLogin, validarTokenAcesso } from "../service/autenticacao.js";
import router from "@/router";
import AlertaInfo from '../components/AlertaInfo.vue';

export default {
    name: "LoginView",

    components: {
        AlertaInfo,
    },

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

    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
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
            } else if (status === 500) {
                this.mensagemAlerta = "Ops! Ocorreu algum problema interno no servidor!"
            }
            else {
                this.mensagemAlerta = "Um erro inesperado aconteceu, busque suporte!";
            }

            this.alerta = true;
            setTimeout(() => {
                this.fecharAlerta();
            }, 5000);
        },

        fecharAlerta() {
            this.alerta = false;
        },
    }

}
</script>

<style scoped>
.container {
    height: calc(100vh - 5rem);
    display: flex;
    overflow: hidden;
}

.area-imagem {
    width: 50%;
    height: 100%;
}

.area-imagem img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.area-login {
    margin-top: 5rem;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.area-form h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
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

.email,
.senha,
.botao {
    width: 35rem;
    height: 5rem;
    color: var(--preto);
    border-radius: 0.5rem;
}

.email,
.senha {
    background-color: var(--branco);
    border: 1px solid var(--brancoClaro);
    padding-right: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
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

.botao:hover {
    background-color: var(--corPrincipalClara);
}

@media (max-width: 1023px) {
    .container {
        height: calc(100vh - 3.5rem);
    }
}

@media (max-width: 780px) {
    .area-login {
        width: 100%;
    }

    .area-imagem {
        display: none;
    }
}

@media (max-width: 350px) {
    .area-login {
        width: 100%;
    }

    .email, .senha, .botao {
        width: 28rem;
        height: 5rem;
    }
}
</style>