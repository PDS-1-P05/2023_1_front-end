<template>
  <div class="wrapper">

    <!-- HERO -->
    <section id="hero" class="conteudo">
      <div class="hero-wrapper">
        <h2>
          Obtenha informações sobre o saneamento básico de Mato Grosso do Sul
        </h2>
        <div class="linha-horizontal"></div>
        <p>
          Informações que podem ser consumidas de múltiplas maneiras
          como gráficos gerados a partir de filtros pré-selecionados,
          tabelas de dados que podem ser exportadas para usos diversos
          e boletins municipais para acompanhar o desempenho de qualquer município.
        </p>
      </div>
    </section>

    <!-- SOBRE -->
    <section id="sobre" class="conteudo">
      <div class="coluna-a">
        <div class="linha-vertical"></div>
        <div class="texto-esquerda">
          <h3>Sobre - Regula.SUN</h3>
          <p>
            Regula.SUN é uma aplicação que tem por objetivo proporcionar aos
            cidadãos de Mato Grosso do Sul acesso a informações de saneamento
            básico de maneira simples e concisa.
          </p>
        </div>
      </div>
      <div class="coluna-b">
        <img src="@/assets/REGULASUN.svg" alt="logo do regula sun">
      </div>
    </section>

    <!-- GRÁFICO -->
    <section id="grafico" class="conteudo">
      <div class="coluna-b">
        <div> teste </div>
      </div>
      <div class="coluna-a">
        <div class="texto-direita">
          <h3>Gerador de Gráficos</h3>
          <p>
            As informações sobre cidades e seus indicadores e metas podem ser filtradas
            e visualizadas através de um gráfico gerado de acordo com os filtros selecionados.
            É simples!
          </p>
        </div>
        <div class="linha-vertical"></div>
      </div>
    </section>

    <!-- BOLETIM -->
    <section id="boletim" class="conteudo">
      <div class="coluna-a">
        <div class="linha-vertical"></div>
        <div class="texto-esquerda">
          <h3>Boletim Municipal</h3>
          <p>
            Cada cidade possuí seu boletim anual contendo informações sobre seus
            indicadores e resultados anuais.
            Faça o download do boletim da sua cidade e veja o desempenho da mesma!
          </p>
        </div>
      </div>
      <div class="coluna-b">
        teste
      </div>
    </section>
  </div>
</template>

<script>

import 

export default {
  components: {
    HomeButton
  }
}

</script>

<style scopped>

.wrapper h2 {
  font-size: 2.6rem;
  font-family: var(--fontePrincipal);
}

.wrapper h3 {
  font-size: 1.6rem;
  font-family: var(--fontePrincipal);
}

.wrapper p {
  font-size: 1.3rem;
  font-family: var(--fonteSecundaria);
}

.wrapper #hero, #grafico {
  color: var(--branco);
  background-color: var(--corPrincipal);
}

.wrapper #sobre, #boletim {
  color: var(--preto);
}

.linha-horizontal {
  background-color: var(--branco);

  width: 25vw;
  height: 1rem;
}

.linha-vertical {
  width: 0.5rem;
  height: 100%;

  background-color: var(--preto);
}

.conteudo {
  padding-inline: 1.5rem;
  padding-block: 9rem;
}

.hero-wrapper {
  display: grid;
  grid-template-columns: 75%;
  gap: 1.5rem;
}

.coluna-a {
  display: grid;
  grid-template-columns: 1% 1fr;
  gap: 3rem;
}

.texto-esquerda {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.texto-direita {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: end;
}

#grafico .coluna-a {
  grid-template-columns: 1fr 1%;
}

#grafico .linha-vertical {
  background-color: var(--branco);
}

/* BREAKPOINT 1024PX */
@media (max-width: 1024px) {
   .coluna-b {
    display: none;
   }
}
</style>
