<template>
    <footer >
        <a id="agems" href="https://www.agems.ms.gov.br/"><img src="@/assets/AGEMS.svg" :alt="Image" width="200" height="80" /></a>
        <a id="nes" href="https://nes.facom.ufms.br/"><img src="@/assets/NES.svg" :alt="Image" width="50" height="86" /></a>
        <a id="ufms" href="https://www.ufms.br/"><img src="@/assets/UFMS-LOGO.svg" :alt="Image" width="100" height="100" /></a>   
    </footer>
</template>

<script>
export default {
    name: 'HomeFooter',    
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