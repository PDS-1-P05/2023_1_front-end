import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue'
// import Grafico from '../views/HomeView.vue'
// import Boletim from '../views/Boletim.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    /*
    {
      path: '/grafico',
      name: 'grafico',
      component: Grafico
    },
    {
      path: '/boletim',
      name: 'boletim',
      component: Boletim
    },*/
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },

  ]
})

export default router
