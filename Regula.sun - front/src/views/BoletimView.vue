<template>
  <div id="wrapper-boletim">
    <section id="seletor">
      <p>Boletim</p>
      <SelectBoletim @update:modelValue="atualizarMunicipio" :municipios=municipios />
      <button @click="preVisualizar">Pré-Visualizar Boletim </button>
      <AlertaInfo :valor="valordaview" v-if="alerta" idAlerta="BoletimMunicipio"
        mensagem="Selecione um município para gerar o Boletim" :fechar="fecharAlerta" widthAlerta="40rem" />
    </section>
    <section v-if="modeloPDF" id="preview-pdf">
      <ModeloBoletim :nomeMunicipio="municipioSelecionado" />
    </section>
    <section id="info">
      <div id="definicao">
        <h3>
          O que é o boletim?
        </h3>
        <p>
          É um documento em formato PDF com o resultado final das fiscalizações programadas e eventuais
          feitas pela equipe de fiscalização. Este arquivo descreve as constatações, não-conformidades e
          determinações estabelecidas do município a sua escolha. Em síntese, são exibidas informações
          numéricas e gráficas das metas por indicador.
        </p>
      </div>
      <div id="informacao">
        <h3>
          Quais informações terão nele?
        </h3>
        <p>
          O boletim apresenta 10 indicadores, os quais foram selecionados por cidadãos do estado de Mato Grosso do Sul.
          Além disso, ele exibe o(s) ano(s) da(s) última(s) coleta(s) num período de 4 anos. O valor exibido refere-se 
          a coleta do último ano inserido. Junto deste valor há uma ilustração representada por gotas dividas por cores,
          conforme a legenda abaixo.
        </p>
      </div>
    </section>

    <section id="legenda">
      <h2>Legenda</h2>
      <div class="gotas">
        <div class="gota-img">
          <img src="@/assets/azul.svg" :alt="Excelente" />
          <div class="gota-descricao">
            <p>Excelente</p>
            <p>(Acima da meta em mais de 25%)</p>
          </div>
        </div>
        <div class="gota-img">
          <img src="@/assets/verde.svg" :alt="Bom" />
          <div class="gota-descricao">
            <p>Bom</p>
            <p>(Acima da meta em até 25%)</p>
          </div>
        </div>
        <div class="gota-img">
          <img src="@/assets/amarelo.svg" :alt="Mediano" />
          <div class="gota-descricao">
            <p>Satisfatório</p>
            <p>(Meta cumprida e/ou resultados ideais)</p>
          </div>
        </div>
        <div class="gota-img">
          <img src="@/assets/laranja.svg" :alt="Mediano" />
          <div class="gota-descricao">
            <p>Insatisfatório</p>
            <p>(Entre 51% e 75% do desejado)</p>
          </div>
        </div>
        <div class="gota-img">
          <img src="@/assets/vermelho.svg" :alt="Ruim" />
          <div class="gota-descricao">
            <p>Muito Insatisfatório</p>
            <p>(Abaixo de 50% do desejado)</p>
          </div>
        </div>
        <div class="gota-img">
          <img src="@/assets/preto.svg" :alt="SemInformacao" />
          <div class="gota-descricao">
            <p>Sem Informação</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SelectBoletim from '@/components/SelectBoletim.vue';
import ModeloBoletim from "@/components/ModeloBoletim.vue";
import AlertaInfo from '@/components/AlertaInfo.vue';
import { getMunicipios } from "../service/requisicao";

export default {
  components: {
    SelectBoletim,
    ModeloBoletim,
    AlertaInfo,
  },

  created() {
    this.fazerRequisicao();
  },

  data() {
    return {
      municipios: [],
      largura: window.innerWidth,
      classe: '',

      alerta: false,
      temporizador: null,
      municipioSelecionado: '',
      valordaview: 'meu valor da view',
      modeloPDF: false,
    };
  },

  methods: {
    async fazerRequisicao() {
      const municipios = await getMunicipios();

      if (municipios) {
        this.$store.commit('armazenarMunicipios', municipios.data)
        this.municipios = this.$store.getters.getArrayNomeMunicipios();
      }
    },

    atualizarMunicipio(municipio) {
      this.municipioSelecionado = municipio;
    },

    preVisualizar() {
      if (!this.municipioSelecionado) {
        this.alerta = true;
        this.temporizador = setTimeout(() => {
          this.fecharAlerta();
        }, 5000);
      } else {
        clearTimeout(this.temporizador);
        this.$store.commit('salvarMunicipioSelecionado', this.municipioSelecionado);
        this.emitter.emit('exibirBoletim');
        this.modeloPDF = true;
      }
    },

    fecharAlerta() {
      this.alerta = false;
    }
  },

}
</script>

<style scoped>
section {
  color: var(--preto);
}

#seletor p {
  font-weight: bold;
  font-size: 3rem;
}

#wrapper-boletim {
  padding-inline: 1.5rem;
  padding-bottom: 5rem;
}

#seletor {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 10rem;
  margin-bottom: 9rem;
}

#seletor h2 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;
  font-weight: 600;
}

button {
  width: 23rem;
  height: 4rem;
  color: var(--branco);
  border-radius: 0.5rem;
  background-color: var(--corPrincipal);
  font-size: 1.6rem;
  margin-top: 4.5rem;
}

button:hover {
  background-color: var(--corPrincipalClara);
}

#preview-pdf {
  background-color: rgba(226, 231, 235, 0.44);
  padding: 2rem;
  border-radius: 5px;
}

#info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 3rem 0;
  text-align: justify;
}

#info h3 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;
  font-weight: bold;
}

#info p {
  font-family: var(--fonteSecundaria);
  font-size: 1.3rem;
}

#info div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-basis: calc(50% - 1.5rem);
}

#legenda {
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
  gap: 1.5rem;
}

#legenda h2 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;
  padding-bottom: 3rem;
}

.gotas {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.gota-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.gota-img img {
  height: 3.3rem;
  width: 3.9rem;
}

.gota-img p {
  font-family: var(--fontePrincipal);
  font-size: 0.8rem;
}

.gota-descricao {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}

.gota-img:nth-child(6) {
  margin-bottom: 2rem;
}

.gota-descricao>p:first-child {
  font-weight: bold;
}

@media screen and (min-width: 450px) {
  .gota-img img {
    height: 6rem;
    width: 6.5rem;
  }

  .gota-img p {
    font-size: 1.3rem;
  }

  .gota-descricao>p:last-child {
    padding: 0 1.5rem;
    text-align: center;
  }
}

@media screen and (min-width: 1000px) {
  #info {
    flex-direction: row;
  }

  #wrapper-boletim {
    padding-inline: 10rem;
  }

  #seletor {
    gap: 7rem;
  }

  .gotas {
    display: flex;
    flex-direction: row;
  }

}

@media screen and (min-width: 1024px) {
  #seletor h2 {
    font-size: 2.5rem;
  }
}
</style>