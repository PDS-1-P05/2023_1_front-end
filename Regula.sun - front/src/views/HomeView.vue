<template>
  <main>
    
    <section class="wrapper background-hero" id="hero">
      <div class="hero-wrapper">
        <h2>
          Obtenha informações sobre o saneamento básico de Mato Grosso do Sul
        </h2>
        <div class="linha-horizontal"></div>
        <p>
          Informações que podem ser consumidas de múltiplas maneiras como gráficos gerados a partir de filtros pré-selecionados, tabelas de dados que podem ser exportadas para usos diversos e boletins municipais para acompanhar o desempenho de qualquer município.
        </p>
      </div>
    </section>

    <section class="wrapper" id="sobre">
        <div :class="classe">
          <div class="coluna-a">
            <div class="linha-vertical"></div>
            <div class="texto-wrapper">
              <h3>
                Sobre - Regula.SUN
              </h3>
              <p>
                Regula.SUN é uma aplicação que tem por objetivo proporcionar aos cidadãos de Mato Grosso do Sul acesso a informações de saneamento básico de maneira simples e concisa.
              </p>
            </div>
          </div>
          <div class="coluna-b">
            <img src="@/assets/REGULASUN.svg" alt="">
          </div>
        </div>
    </section>

    <section class="wrapper background" id="grafico">
      <div :class="classe">
        <div class="coluna-b">
          <div class="moldura-grafico">
            <img src="@/assets/CHARTS.png" alt="">
          </div>
        </div>
        <div class="coluna-a-wrapper">
          <div class="coluna-a">
            <div class="texto-wrapper-esquerda">
              <h3>
                Gerador de Gráficos
              </h3>
              <p>
                As informações sobre cidades e seus indicadores e metas podem ser filtradas e visualizadas através de um gráfico gerado de acordo com os filtros selecionados.
                É simples!
              </p>
            </div>
            <div class="linha-vertical-branca"></div>
          </div>
          <HomeButton conteudo="GERE SEU GRÁFICO!" />
        </div>
      </div>
    </section>

    <section class="wrapper" id="boletim">
      <div :class="classe">
        <div class="coluna-a-wrapper">
          <div class="coluna-a">
            <div class="linha-vertical"></div>
            <div class="texto-wrapper">
              <h3>
                Boletim Municipal
              </h3>
              <p>
                Cada cidade possuí seu boletim anual contendo informações sobre seus indicadores e resultados anuais. Faça o download do boletim da sua cidade e veja o desempenho da mesma!
              </p>
            </div>
          </div>
          <HomeButton conteudo="GERE O BOLETIM DO SEU MUNICÍPIO!"/>
        </div>
        <div class="coluna-b">
          <div class="moldura-boletim">
            <img src="@/assets/BOLETIM.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </main>
</template>

<script>

import HomeButton from '@/components/HomeButton.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    HomeButton,
    Footer
  },

  data() {
    return {
      largura: window.innerWidth,
      classe: ''
    };
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.largura = window.innerWidth;
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  watch: {
    largura: {
      handler(newLargura) {
        if (newLargura >= 600) {
          this.classe = 'wrapper-section'
        } else if (newLargura <= 600) {
          this.classe = 'wrapper-section-mobile'
        }
      },
      
      immediate: true
    }
  }
}

</script>

<style>

main {
  color: var(--preto);
}

main h2{
  font-family: var(--fontePrincipal);
  font-size: 2.6rem;

  font-weight: 600;
}

main h3 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;

  font-weight: 600;
}

main p {
  font-family: var(--fonteSecundaria);
  font-size: 1.3rem;
}


.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  padding-inline: 1.5rem;
  padding-block: 9rem;
}

.wrapper-section {
  display: grid;
  grid-template-columns: 1fr 1fr;

  max-width: 1024px;
}

.wrapper-section-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-wrapper {
  display: grid;
  grid-template-columns: 75%;
  gap: 3rem;

  max-width: 1024px;
}

.texto-wrapper,
.texto-wrapper-esquerda {
  display: grid;

  gap: 3rem;
}

.texto-wrapper-esquerda {
  text-align: end;
}

.coluna-a-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 3rem;
}

.background-hero {
  color: var(--branco);

  background: rgb(2, 64, 105);
  background: radial-gradient(circle,
    var(--corPrincipal),
    var(--corPrincipalEscura) 72%
  );
}

.background {
  color: var(--branco);
  background-color: var(--corPrincipal);
}

.linha-horizontal {
  width: 25vw;
  height: 1rem;

  background-color: var(--branco);
}

.linha-vertical,
.linha-vertical-branca {
  width: 1rem;
  height: 20rem;

  background-color: var(--preto);
}

.linha-vertical-branca {
  background-color: var(--branco);
}

.coluna-a {
  display: flex;
  gap: 3rem;

  align-items: center;
}

.coluna-b {
  display: none;
}

.moldura-grafico,
.moldura-boletim {
  border-radius: 8rem;
  overflow: hidden;

  height: 40rem;
  width: 75%;
  max-width: 37rem;
}

.moldura-grafico img {
  position: relative;
  top: -5rem;
}

.moldura-boletim img {
  position: relative;
  top: -7rem;
  left: -10rem;
}

.limitador {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1024px;
}

@media screen and (min-width: 600px) {
  .coluna-b {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #sobre .coluna-b img {
    width: 50%;
    max-width: 22rem;
  }
}

@media screen and (min-width: 600px) {
  .moldura-boletim {
    border-radius: 8rem;
    overflow: hidden;

    height: 65%;
    width: 75%;
  }

  .moldura-boletim img {
    position: relative;
    top: -7rem;
    left: -10rem;
  }

}

@media screen and (min-width: 1024px) {
  main h2{
    font-family: var(--fontePrincipal);
    font-size: 5.5rem;

    font-weight: 600;
  }

  main h3 {
    font-family: var(--fontePrincipal);
    font-size: 3.4rem;

    font-weight: 600;
  }

  main p {
    font-family: var(--fonteSecundaria);
    font-size: 1.6rem;
  }
}

</style>
