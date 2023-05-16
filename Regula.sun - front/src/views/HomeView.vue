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
          <HomeButton @click="redirecionarParaPagina" conteudo="GERE SEU GRÁFICO!" />
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

    <section id="ranking">
      <div class="ranking-wrapper">
        <div id="ranking-descricao">
          <h2>
            RANKING
          </h2>
          <p>das melhores cidades de Mato Grosso Do Sul de
            acordo com seus indicadores e metas </p>
        </div>
        <div id="medalhas">
          <div class="medalha-bottom">
            <img src="@/assets/MEDALHA-DE-PRATA.svg" alt="Uma medalha de prata com o número 2 nela">
            <h4>
              Miranda
            </h4>
          </div>
          <div class="medalha-top">
            <img src="@/assets/MEDALHA-DE-OURO.svg" alt="Uma medalha de ouro com o número 1 nela">
            <h4>
              Campo Grande
            </h4>
          </div>
          <div class="medalha-bottom">
            <img src="@/assets/MEDALHA-DE-BRONZE.svg" alt="Uma medalha de bronze com o número 3 nela">
            <h4>
              Rio Verde
            </h4>
          </div>
        </div>
        <div id="tabela">
          <div class="classificacao">
            <h4>4º</h4>
            <h5>Três Lagoas</h5>
          </div>
          <div class="classificacao">
            <h4>5º</h4>
            <h5>Dourados</h5>
          </div>
          <div class="classificacao">
            <h4>6º</h4>
            <h5>Bonito</h5>
          </div>
          <div class="classificacao">
            <h4>7º</h4>
            <h5>Corumbá</h5>
          </div>
          <div class="classificacao">
            <h4>8º</h4>
            <h5>Aquidauana</h5>
          </div>
          <div class="classificacao">
            <h4>9º</h4>
            <h5>Maracaju</h5>
          </div>
          <div class="classificacao">
            <h4>10º</h4>
            <h5>Coxim</h5>
          </div>
        </div>
      </div>
    </section>
    <HomeFooter></HomeFooter>
  </main>
</template>

<script>

import HomeButton from '@/components/HomeButton.vue'
import HomeFooter from '@/components/HomeFooter.vue'
import { TimeScale } from 'chart.js';

export default {
  components: {
    HomeButton,
    HomeFooter
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
    },

    redirecionarParaPagina() {
      this.$router.push('/grafico')
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

<style scoped>

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

#ranking {
  display: flex;
  justify-content: center;
  align-items: center;

  padding-inline: 1.5rem;
  padding-block: 9rem;

  background-color: var(--corPrincipalEscura);
  color: var(--branco);
}

#ranking h2 {
  font-family: var(--fontePrincipal);
  font-weight: bold;
  font-size: 2.1rem;
}

#ranking h4 {
  font-family: var(--fontePrincipal);
  font-weight: bold;
  font-size: 1.6rem;
}

#ranking h5 {
  font-family: var(--fontePrincipal);
  font-weight: bold;
  font-size: 1.3rem;
}

#ranking p {
  font-family: var(--fonteSecundaria);
  font-size: 0.8rem;
}

.ranking-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6rem;

  max-width: 57rem;
}

#ranking-descricao {
  text-align: center;
}

#medalhas {
  display: flex;
  justify-content: space-between;

  height: 16rem;
}

.medalha-top,
.medalha-bottom {
  display: flex;
  flex-direction: column;

  text-align: center;

  gap: 1rem;
}

.medalha-top {
  justify-content: start;
}

.medalha-bottom {
  justify-content: end;
}

#tabela {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.classificacao {
  display: flex;
  justify-content: space-between;
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
