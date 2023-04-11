<template>
    <header>
        <nav>
            <v-img v-show="!mobile">
                <router-link to="/">
                    <img src="../assets/REGULASUN.svg" alt="logo" width="90" height="90" />
                </router-link>
            </v-img>

            <v-img v-show="mobile">
                <router-link to="/">
                    <img src="../assets/REGULASUN.svg" alt="logo" width="90" height="90" align="right" />
                </router-link>
            </v-img>

            <ul v-show="!mobile" class="nav">
                <v-row align-content="center">
                    <li v-for="link in links" :key="link.para">
                        <router-link class="nav-item" :to="link.para">
                            <v-icon class="nav-icon">{{ link.icone }}</v-icon>
                            {{ link.nome }}
                        </router-link>
                    </li>
                </v-row>
            </ul>

            <div class="menu-icon">
                <v-icon v-show="mobile" @click="toggleMobileNav" :class="{ 'icone-ativo': mobileNav }">mdi-menu</v-icon>
            </div>
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-menu">
                    <v-icon class="close-icon" @click="toggleDropdownMenu">mdi-close</v-icon>
                    <li v-for="link in links" :key="link.para">
                        <router-link class="nav-item" :to="link.para">
                            <v-icon class="nav-icon">{{ link.icone }}</v-icon>
                            {{ link.nome }}
                        </router-link>
                    </li>
                </ul>
            </transition>
        </nav>
    </header>
</template>
  
<script>
export default {
    name: "Header",
    data() {
        return {
            links: [
                { para: "/", icone: "mdi-home", nome: "Home" },
                { para: "/grafico", icone: "mdi-chart-bar", nome: "Gráfico" },
                { para: "/boletim", icone: "mdi-script-text", nome: "Boletim" },
                { para: "/admin", icone: "mdi-account-tie", nome: "Admin" },
            ],

            mobile: null,
            mobileNav: null,
            widthJanela: null,
        };
    },

    created() {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },

    methods: {
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },

        toggleDropdownMenu() {
            this.mobileNav = !this.mobileNav;
        },

        checkScreen() {
            this.widthJanela = window.innerWidth;
            if (this.widthJanela <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
    },
};
</script>
  
<style scoped>
* {
    background-color: var(--corPrincipal);
    font-family: (--fontePrincipal);
    font-size: 1.6rem;
    color: var(--branco);
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
    list-style: none;
}

header {
    width: 100%;
    position: fixed;
    z-index: 100;
    transition: 0.5s easy all;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
}

nav {
    display: flex;
    flex-direction: row;
    position: relative;
    padding: 1rem 10rem;
    justify-items: center;
    align-items: center;
    transition: 0.5s ease all;
}

img {
    transition: 0.5s ease all;
}

.nav li:not(:nth-child(4)) {
    padding-right: 5rem;
}

.nav-item {
    transition: 0.5s ease all;
    border-bottom: 1px solid transparent;
}

.nav-item:hover {
    cursor: pointer;
    font-weight: bold;
}

.nav-icon {
    padding-right: 0.5rem;
}

.menu-icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 10rem;
    height: 100%;
    cursor: pointer;
    transition: 0.8s ease all;
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
</style>
  