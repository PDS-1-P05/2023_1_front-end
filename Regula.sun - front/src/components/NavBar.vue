<template>
  <header v-if="mobile() == true" class="mobile-view">
    <v-img>
      <router-link to="/">
        <img src="../assets/REGULASUN.svg" alt="logo" align="right" />
      </router-link>
    </v-img>

    <v-icon @click="toggleMenu" class="menu-icon" size="x-large">mdi-menu</v-icon>

    <nav>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-menu">
          <v-icon class="close-icon" @click="toggleDropdown" size="x-large">mdi-close</v-icon>
          <li v-for="link in links" :key="link.para" @click="toggleFechar">
            <router-link class="nav-item" :to="link.para">
              <v-icon class="nav-icon">{{ link.icone }}</v-icon>
              {{ link.nome }}
            </router-link>
          </li>
          <div class="logout-mobile" v-if="logado" @click="sair">
            <v-icon icon="mdi-logout" />
            Sair
          </div>
        </ul>
      </transition>
    </nav>
  </header>

  <header v-else class="web-view">
    <router-link to="/">
      <img src="../assets/REGULASUN.svg" alt="logo" />
    </router-link>
    <nav>
      <ul>
        <li v-for="link in links" :key="link.para">
          <router-link class="nav-item" :to="link.para" :class="active(link)">
            <v-icon class="nav-icon">{{ link.icone }}</v-icon>
            {{ link.nome }}
          </router-link>
        </li>

        <div class="logout-web" v-if="logado" @click="sair">
          <v-icon icon="mdi-logout" />
          Sair
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { deslogar, validarTokenAcesso } from "../service/autenticacao.js";
import router from "@/router";
import store from "../store/index.js";

export default {
  name: "NavbarVue",
  data() {
    return {
      links: [
        { para: "/", icone: "mdi-home", nome: "Home" },
        {
          para: "/grafico",
          icone: "mdi-chart-bar",
          nome: "Gráfico",
        },
        {
          para: "/boletim",
          icone: "mdi-script-text",
          nome: "Boletim",
        },
        {
          para: "/admin",
          icone: "mdi-account-tie",
          nome: "Admin",
        }
      ],

      mobileNav: null,
      larguraJanela: null,
    };
  },

  created() {
    window.addEventListener("resize", this.mobile);
    this.mobile();
  },

  computed: {
    logado() {
      this.rotaAdmin();
      return this.$store.state.usuarioLogado;
    },
  },

  methods: {
    toggleMenu() {
      this.mobileNav = !this.mobileNav;
    },

    toggleDropdown() {
      this.mobileNav = !this.mobileNav;
    },

    toggleFechar() {
      this.mobileNav = !this.mobileNav;
    },

    mobile() {
      this.larguraJanela = window.innerWidth;
      if (this.larguraJanela <= 600) {
        return true;
      } else {
        this.mobileNav = false;
        return false;
      }
    },

    sair() {
      const sair = deslogar();
      if (sair) {
        store.dispatch("atualizarToken", false);
        router.push("/login");
      }
    },

    active(link) {
      return {
        active: this.$route.path === link.para,
      };
    },

    rotaAdmin() {
      validarTokenAcesso().then((token) => {
        if (!token) {
          this.links[3].para = "/login";
          return false;
        } else {
          this.links[3].para = "/admin";
          return true;
        }
      });
    },

  },

  rotaAdmin() {
    validarTokenAcesso().then((token) => {
      if (!token) {
        this.links[3].para = "/login";
        return false;
      } else {
        this.links[3].para = "/admin";
        return true;
      }
    });
  },


};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7rem;
  background-color: var(--corPrincipal);
  font-family: var(--fontePrincipal);
  color: var(--branco);
  width: 100%;
  height: 10rem;
  position: fixed;
  z-index: 100;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
}

img {
  width: 9rem;
  height: 9rem;
}

nav {
  position: relative;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

li {
  text-transform: uppercase;
  list-style: none;
}

.web-view nav li:not(:nth-child(4)) {
  padding-right: 5rem;
}

.nav-item {
  text-decoration: none;
  font-size: 1.7rem;
  color: var(--branco);
}

.nav-item:hover {
  cursor: pointer;
  font-weight: bold;
}

.active {
  border-bottom: 1px solid var(--branco);
  padding-bottom: 5px;
  font-weight: bold;
}

.mobile-view .nav-item {
  font-size: 2rem;
}

.logout-mobile {
  font-size: 2rem;
  text-transform: uppercase;
  cursor: pointer;
}

.logout-mobile:hover {
  font-weight: bold;
}

.logout-web {
  font-size: 1.7rem;
  text-transform: uppercase;
  padding-left: 5rem;
}

.logout-web:hover {
  cursor: pointer;
  font-weight: bold;
}

.menu-icon {
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  cursor: pointer;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: var(--corPrincipal);
  top: 0;
  left: 0;
}

.close-icon {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

@media screen and (min-width: 1024px) {
  header {
    height: 10.5rem;
    padding: 1rem 10rem;
  }

  img {
    width: 10rem;
    height: 10rem;
  }

  .nav-item,
  .logout-web {
    font-size: 2rem;
  }
}

.nav-item .logout-web:hover {
  cursor: pointer;
  font-weight: bold;
}

@media screen and (min-width: 601px) and (max-width: 750px) {
  header {
    height: 10rem;
    padding: 0 5rem;
  }

  img {
    width: 7rem;
    height: 7rem;
  }

  .nav-item,
  .logout-web {
    font-size: 1.3rem;
  }
}

@media screen and (max-width: 600px) {
  header {
    height: 8rem;
    padding: 0 5rem;
  }

  img {
    width: 7rem;
    height: 7rem;
  }
}
</style>
