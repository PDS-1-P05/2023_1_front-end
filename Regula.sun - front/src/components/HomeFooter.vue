<template>
    <footer>
        <a id="agems" href="https://www.agems.ms.gov.br/"><img src="@/assets/AGEMS.svg" :alt="Image" width="200"
                height="80" /></a>
        <a id="nes" href="https://nes.facom.ufms.br/"><img src="@/assets/NES.svg" :alt="Image" width="100"
                height="100" /></a>
        <a id="ufms" href="https://www.ufms.br/"><img src="@/assets/UFMS-LOGO.svg" :alt="Image" width="100"
                height="100" /></a>
    </footer>
</template>

<script>
export default {
    name: 'HomeFooter',
}
</script>

<style scoped>
footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    padding: 5rem 10rem;
}

#agems {
    margin-top: 1rem;
}

#ufms {
    margin-right: 3rem;
}

@media (max-width: 650px) {
    footer {
        flex-direction: column;
        align-items: center;
    }

    #agems {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    #nes {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    #ufms {
        margin-top: 1rem;
        margin-bottom: 2rem;
        margin-left: 3rem;
    }
}

@media (max-width: 485px) {
    footer {
        flex-direction: column;
        align-items: center;
    }

    #agems {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    #nes {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    #ufms {
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
}
</style>