<script setup>
</script>

<template>
  <main>
    <router-view />
  </main>
  <div>
    Teste
  </div>
</template>

<style scoped>

/* IMPORTANDO A FONTE SOURCE SANS 3 */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* IMPORTANDO A FONTE ROBOTO */
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

/* RESET DE ESTILIZAÇÃO */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  /* Paleta de cores */

  /* Principal */
  --corPrincipalClara: #3A84B5;
  --corPrincipal: #024069;
  --corPrincipalEscura: #012136;

  /* Principal */
  --corSecundariaClara: #62B37D;
  --corSecundaria: #28A350;
  --corSecundariaEscura: #1C7038;

  /* Principal */
  --corTerciariaClara: #49C2F2;
  --corTerciaria: #00ADEF;
  --corTerciariaEscura: #0087BD;

  /* Principal */
  --corQuaternariaClara: #FFF64F;
  --corQuaternaria: #FFF102;
  --corQuaternariaEscura: #CCC202;

  /* Branco */
  --branco: #fff;
  --brancoClaro: hsl(0, 0%, 72%);

  /* Preto */
  --preto: #231F20;
  --pretoClaro: hsla(345, 6%, 13%, 0.48);


  
  /* Fontes */
  --fontePrincipal: 'Source Sans 3', sans-serif;;
  --fonteSecundaria: 'Roboto', sans-serif;


  /* Padronização de tamanho */
  font-size: 62.5%; /* 1rem = 10px */
}

html,
body {
  width: 100%;
  height: 100%;
}

</style>
