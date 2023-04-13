<template>
    <footer >
        <a id="agems" href="https://www.agems.ms.gov.br/"><img :src="logo_agems" :alt="Image" width="200" height="80" /></a>
        <a id="nes" href="https://nes.facom.ufms.br/"><img :src="logo_nes" :alt="Image" width="50" height="86" /></a>
        <a id="ufms" href="https://www.ufms.br/"><img :src="logo_ufms" :alt="Image" width="100" height="100" /></a>   
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            logo_agems: 'src/assets/AGEMS.svg',
            logo_nes: 'src/assets/NES.svg',
            logo_ufms: 'src/assets/UFMS-LOGO.svg'
        }
    },    
}
</script>

<style scoped>
    footer{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
        margin-top: 90px;
        margin-bottom: 143px;
        padding-top: 2%;
        padding-bottom: 5%;
    }
    @media (max-width: 650px) {
        footer{
            flex-direction: column;
            text-align: center;
        }
        #agems{
            margin-top: 20px;
            margin-bottom: 20px;  
        }
        #nes{
            margin-top: 10px;
            margin-bottom: 20px;  
        }
        #ufms{
            margin-top: 10px;
            margin-bottom: 20px;  
        }
    }
   
</style>