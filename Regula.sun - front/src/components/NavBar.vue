<template>
  <header v-if="mobile() == true" class="mobile-view">
    <v-img>
      <router-link to="/">
        <img src="../assets/REGULASUN.svg" alt="logo" align="right" />
      </router-link>
    </v-img>

    <v-icon @click="toggleMenu" class="menu-icon">mdi-menu</v-icon>

    <nav>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-menu">
          <v-icon class="close-icon" @click="toggleDropdown">mdi-close</v-icon>
          <li v-for="link in links" :key="link.para" @click="toggleFechar">
            <router-link class="nav-item" :to="link.para">
              <v-icon class="nav-icon">{{ link.icone }}</v-icon>
              {{ link.nome }}
            </router-link>
          </li>
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
          <router-link class="nav-item" :to="link.para">
            <v-icon class="nav-icon">{{ link.icone }}</v-icon>
            {{ link.nome }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        { para: "/", icone: "mdi-home", nome: "Home" },
        { para: "/grafico", icone: "mdi-chart-bar", nome: "Gráfico" },
        { para: "/boletim", icone: "mdi-script-text", nome: "Boletim" },
        { para: "/admin", icone: "mdi-account-tie", nome: "Admin" },
      ],

      mobileNav: null,
      larguraJanela: null,
    };
  },

  created() {
    window.addEventListener("resize", this.mobile);
    this.mobile();
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
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7rem; /* aqui */
  background-color: var(--corPrincipal);
  font-family: var(--fontePrincipal);
  color: var(--branco);
  width: 100%;
  height: 10rem; /* aqui */
  position: fixed;
  z-index: 100;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
}

img {
  /* aqui */
  width: 9.5rem;
  height: 9.5rem;
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
  font-size: 1.7rem; /* aqui */
  color: var(--branco);
}

.nav-item:hover {
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

  .nav-item {
    font-size: 2rem;
  }
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

  .nav-item {
    font-size: 1.5rem;
  }
}

@media screen and (max-width: 600px) {
  header {
    height: 5.5rem;
    padding: 0 5rem;
  }

  img {
    width: 5rem;
    height: 5rem;
  }

  .nav-item {
    font-size: 1rem;
  }
}
</style>
