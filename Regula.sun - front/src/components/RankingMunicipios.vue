<template>
    <section id="ranking">
        <div class="ranking-wrapper">
          <div id="ranking-descricao">
              <h2>
              RANKING
              </h2>
              <p>das melhores cidades de Mato Grosso Do Sul de
              acordo com seus indicadores e metas.</p>
          </div>
          <div id="medalhas">
              <div class="medalha-bottom">
              <img src="@/assets/MEDALHA-DE-PRATA.svg" alt="Uma medalha de prata com o número 2 nela">
              <h4>
                  {{ this.segundoLugar }}
              </h4>
              </div>
              <div class="medalha-top">
              <img src="@/assets/MEDALHA-DE-OURO.svg" alt="Uma medalha de ouro com o número 1 nela">
              <h4>
                  {{ this.primeiroLugar }}
              </h4>
              </div>
              <div class="medalha-bottom">
              <img src="@/assets/MEDALHA-DE-BRONZE.svg" alt="Uma medalha de bronze com o número 3 nela">
              <h4>
                  {{ this.terceiroLugar }}
              </h4>
              </div>
          </div>
          <div id="tabela">
              <div class="classificacao">
              <h4>4º</h4>
              <h5>
                  {{ this.quartoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>5º</h4>
              <h5>
                  {{ this.quintoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>6º</h4>
              <h5>
                  {{ this.sextoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>7º</h4>
              <h5>
                  {{ this.setimoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>8º</h4>
              <h5>
                  {{ this.oitavoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>9º</h4>
              <h5>
                  {{ this.nonoLugar }}
              </h5>
              </div>
              <div class="classificacao">
              <h4>10º</h4>
              <h5>
                  {{ this.decimoLugar }}
              </h5>
              </div>
          </div>
          <div id="sobre">
              <h4>
                Sobre
              </h4>
              <div>
                  <p>
                    A pontuação é feita seguindo 5 indicadores, os quais devem atingir uma determinada meta, se:
                  </p>
                  <p>
                    2pts - O município atingiu 100% ou mais da meta.
                  </p>
                  <p>
                    1pt - O município alcançou pelo menos 50% da meta.
                  </p>
                  <p>
                    0 - O município está abaixo de 50% da meta.
                  </p>
              </div>
            <p>
              Desempate por ordem Alfabética.
            </p>
            <p>
              Os indicadores utilizados para avaliar os municípios foram:
            </p>
            <ul>
              <li>
                Indicadores de Cobertura: Atendimento urbano de Água;
              </li>
              <li>
                Indicadores de Cobertura: Coleta de Esgoto;
              </li>
              <li>
                Indicadores de Qualidade da Água Distribuída;
              </li>
              <li>
                Indicadores de Cobertura: Atendimento urbano de Água;
              </li>
              <li>
                % de queda nos casos de internação por motivos relacionados a falta ou inadequação de saneamento básico.
              </li>
            </ul>
          </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "RankingMunicipios",

    props: {
        ranking: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            primeiroLugar: '',
            segundoLugar: '',
            terceiroLugar: '',
            quartoLugar: '',
            quintoLugar: '',
            sextoLugar: '',
            setimoLugar: '',
            oitavoLugar: '',
            nonoLugar: '',
            decimoLugar: '',
        }
    },

    watch: {
        ranking: {
            handler(newRanking) {
                this.primeiroLugar = newRanking[0][0]
                this.segundoLugar = newRanking[1][0]
                this.terceiroLugar = newRanking[2][0]
                this.quartoLugar = newRanking[3][0]
                this.quintoLugar = newRanking[4][0]
                this.sextoLugar = newRanking[5][0]
                this.setimoLugar = newRanking[6][0]
                this.oitavoLugar = newRanking[7][0]
                this.nonoLugar = newRanking[8][0]
                this.decimoLugar = newRanking[9][0]
            }
        }
     }
}


</script>


<style scoped>

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
  font-size: 1.3rem;
}

.ranking-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6rem;

  max-width: 57rem;
}

#ranking-descricao {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
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
  align-items: center;
}

.medalha-top img{
  max-width: 10rem;
}

.medalha-bottom {
  justify-content: end;
  align-items: center;

  width: 11rem;
}

.medalha-bottom img{
  max-width: 8rem;
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

#sobre {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#sobre li {
  font-family: var(--fonteSecundaria);
  font-size: 1.3rem;
}

</style>