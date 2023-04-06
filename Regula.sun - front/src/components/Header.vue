<template>
    <header>
        <div class="logo">
            <img src="../assets/REGULASUN.svg" alt="Logo" width="85" height="85">
        </div>

        <div class="menu">
            <li class="menu-item">
                <a href="#">
                    <i class="pi pi-home" style="font-size: 2rem"></i>
                    <p>Home</p>
                </a>
            </li>
            <li class="menu-item">
                <a href="#">
                    <i class="pi pi-chart-bar" style="font-size: 2rem"></i>
                    <p>Gráfico</p>
                </a>
            </li>
            <li class="menu-item">
                <a href="#">
                    <i class="pi pi-file" style="font-size: 2rem"></i>
                    <p>Boletim</p>
                </a>
            </li>
            <li class="menu-item">
                <a href="#">
                    <i class="pi pi-user" style="font-size: 2rem"></i>
                    <p>Admin</p>
                </a>
            </li>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
}
</script>

<style scoped>
* {
    background-color: var(--corPrincipal);
    font-family: var(--fontePrincipal);
    font-size: 1.6rem;
    color: var(--branco);
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
}

header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 15rem;
}

.logo {
    display: flex;
    flex-direction: row;
    justify-items: space-between;
    align-items: center;
}

.menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
}

.menu a {
    display: flex;
    flex-direction: row;
}

.menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-self: center;
    padding-right: 3rem;
}

.menu-item i {
    padding-right: 1rem;
}
</style>