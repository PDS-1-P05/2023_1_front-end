<template>

        <button target="_blank" @click="baixarPDF">Baixar Boletim</button>
 
    <div id="meu-componente">
    <div class="logos">
      <img src="../assets/Agems.svg" width="100" height="25" />
      <img src="../assets/regulasun.svg" width="40" />
    </div>
    <div class="titulo">
      <p class="carta">Carta de Desempenho à Sociedade</p>
      <p class="descricao">
        Avaliação de Desempenho dos Serviços de Abastecimento de Água e
        Esgotamento Sanitário - Ref.: 2021
      </p>
    </div>
  
    <div class="municipio">
      <p class="nome-municipio">Abaiara</p>
  
      <div class="info-municipio">
        <p>População Urbana (hab.)</p>
        <p>5.124</p>
      </div>
      <hr />
      <div class="info-municipio">
        <p>População Total (hab.)</p>
        <p>3.245</p>
      </div>
      <hr />
      <div class="info-municipio">
        <p>Vencimento de Delegação</p>
        <p>06/05/2025</p>
      </div>
    </div>
  
    <v-table class="tabela">
      <thead>
        <th>Indicadores</th>
        <th>2022</th>
        <th>2023</th>
        <th>2024</th>
        <th>2025</th>
        <th>2025</th>
        <th>Valor</th>
        <th>Un.</th>
      </thead>
      <tbody>
        <tr v-for="info in linha" :key="info.id">
          <td>
            {{ info.indicador }}
          </td>
          <td>
            <img :src="info.ano_1" :width="10" />
          </td>
          <td>
            <img :src="info.ano_2" :width="10" />
          </td>
          <td>
            <img :src="info.ano_3" :width="10" />
          </td>
          <td>
            <img :src="info.ano_4" :width="10" />
          </td>
          <td>
            <img :src="info.ano_5" :width="10" />
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
    <img src="../assets/legenda.svg" class="legenda" />
  
    <footer>
      <div class="amarelo" />
      <div class="verde" />
      <div class="azul" />
    </footer>
</div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';

  export default {
    name: "TemplateBoletim",
    data() {
      return {
        linha: [
          {
            id: "1",
            indicador: "IA02 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/mediano-amarelo.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
  
            valor: "71,5",
            un: "%",
          },
          {
            id: "2",
            indicador: "IA02 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/ruim-vermelho.svg",
            ano_2: "../public/seminfo-preto.svg",
            ano_3: "../public/bom-verde.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
  
            valor: "200",
            un: "m³",
          },
          {
            id: "3",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "4",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "5",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "6",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "7",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "8",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "9",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
          {
            id: "10",
            indicador: "Medida 3 – Índice de Atendimento Urbano de Água",
            ano_1: "../public/excelente-azul.svg",
            ano_2: "../public/excelente-azul.svg",
            ano_3: "../public/excelente-azul.svg",
            ano_4: "../public/excelente-azul.svg",
            ano_5: "../public/excelente-azul.svg",
            valor: "1234",
            un: "%",
          },
        ],
      };
    },

    methods: {
    baixarPDF() {
      const options = {
        filename: 'nome-cidade.pdf', // Insira o nome desejado para o arquivo PDF aqui
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },

              };

              const element = document.getElementById('meu-componente'); // Insira o ID do seu componente aqui
     const teste = html2pdf().set(options).from(element).save();
     this.$store.commit('salvarPDFBoletim', teste);

      var linkTemp = document.createElement("a");
        linkTemp.href= this.$store.state.pdfBoletim;
        linkTemp.target='_blank';
        linkTemp.download="arquivo.pdf";
        linkTemp.click();

                // window.open('Modelo', '_blank');
    }
  }
  };
  </script>
  
  <style scoped>
  * {
    background-color: #fff;
  }

  button {
    background-color: grey;
    width: 15rem;
    height: 4rem;
    border-radius: 0.5rem;
    float: right;

    font-size: 1.3rem;
    font-weight: bold;
    color: var(--branco);
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
    margin-top: 0;
  }
  
  .carta {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  .descricao {
    font-size: 10px;
    margin-top: 0;
    padding-top: 0;
  }
  
  .nome-municipio {
    font-size: 12px;
    font-weight: bold;
    margin: 0;
  }
  
  .info-municipio {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  
    margin: 0;
    padding: 5px 0;
  }
  
  .info-municipio p {
    margin: 0;
    font-size: 12px;
  }
  
  .tabela {
    margin-top: 40px;
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
  
  .legenda {
    height: 10px;
    margin: 20px 0;
  }
  
  footer {
    margin: 0;
    padding: 0;
  }
  
  .amarelo {
    height: 15px;
    margin: 3rem 0 0 0;
    background: #ebda40;
  }
  
  .verde {
    height: 15px;
    background: #28a350;
  }
  
  .azul {
    height: 15px;
    background: #024069;
  }
  </style>
  