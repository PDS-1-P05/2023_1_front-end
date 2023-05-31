<template>
  <div id="wrapper-boletim">
    <section id="seletor">
      <p>Boletim</p>
      <SelectBoletim @update:modelValue="atualizarMunicipio" :municipios=municipios />
      <DefaultButton target="_blank" conteudo="Pré-Visualizar Boletim" @click="preVisualizar" />
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
          realizadas pela equipe de fiscalização descrevendo as constatações, não-conformidades, recomendações e
          determinações estabelecidas do município a sua escolha.
        </p>
      </div>
      <div id="informacao">
        <h3>
          Quais informações terão nele?
        </h3>
        <p>
          As informações exibidas serão o ano em que foi coletado os dados alguns indicadores junto
          com seus valores sendo ilustrado numericamente e em cores, conforme a legenda abaixo.
        </p>
      </div>
    </section>

    <section id="legenda">
      <h2>Legenda</h2>
      <div class="gotas">
        <div class="gota-img">
          <img :src="azul" :alt="Excelente" />
          <p>Excelente</p>
        </div>
        <div class="gota-img">
          <img :src="verde" :alt="Bom" />
          <p>Bom</p>
        </div>
        <div class="gota-img">
          <img :src="amarelo" :alt="Mediano" />
          <p>Mediano</p>
        </div>
        <div class="gota-img">
          <img :src="vermelho" :alt="Ruim" />
          <p>Ruim</p>
        </div>
        <div class="gota-img">
          <img :src="preto" :alt="SemInformacao" />
          <p>Sem Informação</p>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import SelectBoletim from '@/components/SelectBoletim.vue';
import DefaultButton from '@/components/DefaultButton.vue';
import ModeloBoletim from "@/components/ModeloBoletim.vue";
import AlertaInfo from '@/components/AlertaInfo.vue';
import { getMunicipios } from "../service/requisicao";

export default {
  components: {
    SelectBoletim,
    ModeloBoletim,
    AlertaInfo,
    DefaultButton
  },

  created() {
    this.fazerRequisicao();
  },

  data() {
    return {
      municipios: [],
      largura: window.innerWidth,
      classe: '',
      azul: 'src/assets/azul.svg',
      verde: 'src/assets/verde.svg',
      amarelo: 'src/assets/amarelo.svg',
      vermelho: 'src/assets/vermelho.svg',
      preto: 'src/assets/preto.svg',

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

        // window.open(caminhoPDF, '_blank');
      }
      // html2pdf(this.$refs.Modelo, {
      //   margin: [1, 1, 0, 1],
      //   filename: "municipio.pdf",
      //   image: { type: "png", quality: 1 },
      //   html2canvas: {
      //     dpi: 600,
      //     letterRendering: true,
      //     useCORS: true,
      //     scale: 2,
      //     background: (251, 251, 251),
      //     quality: 4,
      //   },
      //   jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      // });

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
  margin-top: 10rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;

  margin-bottom: 9rem;
}

#seletor h2 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;
  font-weight: 600;
}

button {
  background-color: var(--corPrincipalClara);
  color: var(--branco);
  border-radius: 0.5rem;
  width: 23rem;
  height: 4rem;
  font-size: 1.3rem;
  margin-top: 4.5rem;
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
  gap: 1.5rem;
  padding-top: 2.5rem;
}

#legenda h2 {
  font-family: var(--fontePrincipal);
  font-size: 1.6rem;
}

.gotas {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

@media screen and (min-width: 450px) {
  .gota-img img {
    height: 6rem;
    width: 6.5rem;
  }

  .gota-img p {
    font-size: 1.3rem;
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
}

@media screen and (min-width: 1024px) {
  #seletor h2 {
    font-size: 2.5rem;
  }
}
</style>