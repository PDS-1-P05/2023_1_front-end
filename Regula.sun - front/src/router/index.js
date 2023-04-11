import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// import Grafico from '../views/HomeView.vue'
// import Boletim from '../views/Boletim.vue'
// import Admin from '../views/Admin.vue'

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
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    */
  ]
})

export default router
