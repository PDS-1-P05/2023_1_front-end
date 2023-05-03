import Papa from "papaparse";

export function processarArquivo(arquivoCSV) {
  const config = {
    delimiter: ",",
    header: true,
    transform: (value) => (value === "-" ? "-1" : value),
  };

  const result = Papa.parse(arquivoCSV, config);
  return result;
}

export function retornarColunas(colunas) {
  const cols = [];
  colunas.forEach((coluna) => {
    cols.push({
      text: coluna,
      value: coluna,
    });
  });
  return cols;
}

export function formatarIndicadores(json) {
  var indicadores = {
    emailUsuario: localStorage.getItem("email_usuario"),
    cidades: [],
    valoresIndicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Indicadores") {
      indicadores.cidades.push(coluna);
    }
  }

  for (let cidade = 0; cidade < indicadores.cidades.length; cidade++) {
    indicadores.valoresIndicadores[cidade] = [];
    for(let linha = 0; linha < json.data.length; linha++) {
      let cidadeIndi = indicadores.cidades[cidade];
      indicadores.valoresIndicadores[cidade].push(json.data[linha][cidadeIndi])
    }
  }

  return indicadores;
}

export function formatarMetas(json) {
  var metas = {
    emailUsuario: localStorage.getItem("email_usuario"),
    cidades: [],
    ano: "",
    valoresMetas: [],
  };

  metas.ano = json.data[0]["Ano"];

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Metas" && coluna !== "Ano") {
      metas.cidades.push(coluna);
    }
  }

  for (let cidade = 0; cidade < metas.cidades.length; cidade++) {
    metas.valoresMetas[cidade] = [];
    for(let linha = 0; linha < json.data.length; linha++) {
      let cidadeMeta = metas.cidades[cidade];
      metas.valoresMetas[cidade].push(json.data[linha][cidadeMeta])
    }
  }

  return metas;
}

