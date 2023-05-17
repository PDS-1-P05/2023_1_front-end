import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import GraficoView from "../views/GraficoView.vue";
// import Boletim from "../views/BoletimView.vue";
import { validarTokenAcesso } from "../service/autenticacao";
import store from "../store/index.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/grafico",
            name: "grafico",
            component: GraficoView,
        },
        // {
        //   path: "/boletim",
        //   name: "boletim",
        //   component: Boletim,
        // },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            meta: {
                estaAutenticado: false,
                },
            },
        {
            path: "/admin",
            name: "admin",
            component: AdminView,
            meta: {
                estaAutenticado: false,
                isAdmin: true
            },
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const tokenExiste = await validarTokenAcesso();
    store.dispatch("atualizarUsuarioLogado", tokenExiste);
    next();
});

export default router;