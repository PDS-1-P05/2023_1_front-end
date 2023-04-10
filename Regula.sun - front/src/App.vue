<script setup>
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {

  --corPrincipalClara: #3A84B5;
  --corPrincipal: #024069;
  --corPrincipalEscura: #012136;

  --corSecundariaClara: #62B37D;
  --corSecundaria: #28A350;
  --corSecundariaEscura: #1C7038;

  --corTerciariaClara: #49C2F2;
  --corTerciaria: #00ADEF;
  --corTerciariaEscura: #0087BD;

  --corQuaternariaClara: #FFF64F;
  --corQuaternaria: #FFF102;
  --corQuaternariaEscura: #CCC202;

  --branco: #fff;
  --brancoClaro: hsl(0, 0%, 72%);

  --preto: #231F20;
  --pretoClaro: hsla(345, 6%, 13%, 0.48);


  --fontePrincipal: 'Source Sans 3', sans-serif;;
  --fonteSecundaria: 'Roboto', sans-serif;

  font-size: 62.5%;
}

html,
body {
  width: 100%;
  height: 100%;
}

</style>
