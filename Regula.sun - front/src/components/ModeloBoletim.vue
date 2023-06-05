<template>
  <div id="botao">
    <button @click="baixarPDF">Baixar Boletim</button>
  </div>
  <div id="boletim" target="_blank">
    <div class="logos">
      <img src="../assets/agemsSVG.svg" width="200" height="45" />
      <img src="../assets/regulasun.svg" width="70" />
    </div>
    <div class="titulo">
      <p class="carta">Carta de Desempenho à Sociedade</p>
      <p class="descricao">
        Avaliação de Desempenho dos Serviços de Abastecimento de Água e
        Esgotamento Sanitário - Ref.: 2021
      </p>
    </div>

    <div class="municipio">
      <p class="nome-municipio">{{ municipioEscolhido }}</p>
      <hr />
      <div class="info-municipio">
        <p>População Urbana (hab.)</p>
        <p>{{ populacaoUrbana }}</p>
      </div>

    </div>

    <v-table class="tabela">
      <thead>
        <th>Indicadores</th>
        <th v-for="ano in arrayAno" :key="ano" id="col_ano">{{ ano }}</th>
        <th>Valor</th>
        <th>Unidade</th>
      </thead>
      <tbody>
        <tr v-for="info in linhaTabela" :key="info.id">
          <td>
            {{ info.indicador }}
          </td>
          <td>
            <img :src="info.ano_1" :width="20" />
          </td>
          <td>
            <img :src="info.ano_2" :width="20" />
          </td>
          <td>
            <img :src="info.ano_3" :width="20" />
          </td>
          <td>
            <img :src="info.ano_4" :width="20" />
          </td>
          <td>
            {{ info.valor }}
          </td>
          <td>
            {{ info.un }}
          </td>
        </tr>
      </tbody>
    </v-table>
    <section class="legenda">
      <p>Legenda</p>
      <div class="legenda-items">
        <div class="item-component">
          <img :src="azul" :alt="Excelente" />
          <p>Excelente (Acima da meta em mais de 25%)</p>
        </div>
        <div class="item-component">
          <img :src="verde" :alt="Bom" />
          <p>Bom (Acima da meta em até 25%)</p>
        </div>
        <div class="item-component">
          <img :src="amarelo" :alt="Satisfatório" />
          <p>Satisfatório (Meta cumprida e/ou resultados ideais)</p>
        </div>
        <div class="item-component">
          <img :src="laranja" :alt="Satisfatório" />
          <p>Insatisfatório (Entre 51% e 75% do desejado)</p>
        </div>
        <div class="item-component">
          <img :src="vermelho" :alt="Insatisfatório" />
          <p>Muito Insatisfatório (Abaixo de 50% do desejado)</p>
        </div>
        <div class="item-component">
          <img :src="preto" :alt="SemInformacao" />
          <p>Sem Informação</p>
        </div>
      </div>
    </section>

    <footer>
      <div class="bottom-amarelo" />
      <div class="bottom-verde" />
      <div class="bottom-azul" />
    </footer>
  </div>
</template>
  
<script>
import html2pdf from 'html2pdf.js';
import { getBoletim } from "../service/requisicao";


export default {
  name: "ModeloBoletim",

  data() {
    return {
      linhaTabela: [],
      arrayAno: [],
      anos: [],

      azul: 'src/assets/azul.svg',
      verde: 'src/assets/verde.svg',
      amarelo: 'src/assets/amarelo.svg',
      laranja: 'src/assets/laranja.svg',
      vermelho: 'src/assets/vermelho.svg',
      preto: 'src/assets/preto.svg',
      populacaoUrbana: '',
    };
  },

  computed: {
    municipioEscolhido() {
      return this.$store.state.municipioEscolhido;
    },
  },

  created() {
    this.exibirValor()
  },

  mounted() {
    this.emitter.on("exibirBoletim", () => { this.exibirValor() });
  },

  methods: {
    async exibirValor() {
      this.arrayAno = []
      this.linhaTabela = []

      const anoAtual = new Date().getFullYear() + 1;
      const idMunicipioEscolhido = this.getIdMunicipio(this.municipioEscolhido);
      const boletim = await getBoletim(idMunicipioEscolhido, anoAtual);

      if (boletim.status === 200) {
        this.populacaoUrbana = boletim.data.populacaoUrbana;

        this.arrayAno = Object.values(boletim.data.indicadores)
          .map(indicador => indicador.ano)
          .filter((ano, index, anos) => anos.indexOf(ano) === index);
        while (this.arrayAno.length < 4) { this.arrayAno.push("--") }


        for (const [key, value] of Object.entries(boletim.data.indicadores)) {
          const indicador = value;
          const linhaIndicador = {
            id: indicador.indicador_id,
            indicador: indicador.MetasIndicadores.criterio,
            valor: indicador.valor,
            un: indicador.MetasIndicadores.unidade_medida,
            arrayAno: []
          };

          const anos = Object.keys(boletim.data.indicadores).reduce((arrayAnos, index) => {
            if (boletim.data.indicadores[index].ano !== undefined && !arrayAnos.includes(boletim.data.indicadores[index].ano)) {
              arrayAnos.push(boletim.data.indicadores[index].ano);
            }
            return arrayAnos;
          }, []);

          for (let i = 0; i < anos.length; i++) {
            const metaValor = boletim.data.indicadores[key].metaValor;
            const valor = boletim.data.indicadores[key].valor;
            var propName = `ano_${i + 1}`;

            if (valor === null) {
              linhaIndicador[propName] = "../public/preto.svg";
            } else if ((valor) > (metaValor) + 0.26 * (metaValor)) {
              linhaIndicador[propName] = "../public/azul.svg";
            } else if (0.01 * (metaValor) < (valor) <= (metaValor) + 0.25 * (metaValor)) {
              linhaIndicador[propName] = "../public/verde.svg";
            } else if (0.5 * (metaValor) < (valor) < 0.75 * (metaValor)) {
              linhaIndicador[propName] = "../public/laranja.svg";
            } else if ((valor) < 0.5 * (metaValor)) {
              linhaIndicador[propName] = "../public/vermelho.svg";
            } else {
              linhaIndicador[propName] = "../public/amarelo.svg";
            }
          }

          this.linhaTabela.push(linhaIndicador);
        }

        console.log(this.linhaTabela);
      }
    },

    getIdMunicipio(nome) {
      return this.$store.getters.getIdMunicipio(nome)
    },

    baixarPDF() {
      const nomeMunicipio = this.$store.state.municipioEscolhido;
      const options = {
        filename: `${nomeMunicipio}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 600,
          letterRendering: true,
          useCORS: true,
          scale: 2,
          quality: 4
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      const element = document.getElementById('boletim');
      html2pdf().set(options).from(element).save();
    }
  },

};
</script>
  
<style scoped>
#boletim>*:not(:last-child) {
  margin: 3.068rem;
}

#botao {
  display: flex;
  justify-content: right;
}

button {
  background-color: var(--corSecundaria);
  width: 15rem;
  height: 4rem;
  border-radius: 0.5rem;

  font-size: 1.3rem;
  font-weight: bold;
  color: var(--branco);
  box-shadow: 0rem 0.2rem 0.5rem var(--preto);
}

.logos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0;
}

.titulo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}

.carta {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0;
  padding-bottom: 0;
}

.descricao {
  font-size: 1.3rem;
  margin-top: 0;
  padding-top: 0;
}

.nome-municipio {
  font-size: 1.7rem;
  font-weight: bold;
  margin: 0;
}

.info-municipio {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0.5rem 0;
}

.info-municipio p {
  margin: 0;
  font-size: 1.3rem;
}

.tabela {
  margin-top: 3rem;
  font-size: 1.2rem;
  margin-bottom: 0;
}

th {
  color: #fff;
  background-color: #0b481f;
}

td {
  text-align: center;
}

td:not(:nth-child(1)) {
  text-align: center;
}

#col_ano {
  padding: 0 10px;
}

.legenda {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--fontePrincipal);
  margin-bottom: 20rem;
  align-items: right;
}

.legenda p:nth-child(1) {
  font-size: 1.3rem;
  font-weight: bold;
}

.legenda-items {
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: left;
}

.item-component {
  display: flex;
  padding-bottom: 1rem;
  column-gap: 0.5rem;
}

.item-component img {
  height: 1.8rem;
  width: 1.4rem;
}

.item-component p {
  font-family: var(--fontePrincipal);
  font-size: 1.2rem;
  padding-right: 2rem;
}

footer {
  margin: 0;
  padding: 0;
}

.bottom-amarelo {
  height: 1rem;
  background: #ebda40;
}

.bottom-verde {
  height: 1rem;
  background: #28a350;
}

.bottom-azul {
  height: 1rem;
  background: #024069;
}
</style>
  