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

  for (let i = 0; i < indicadores.cidades.length; i++) {
    indicadores.valoresIndicadores[i] = [];
    for (let j = 0; j < json.data.length; j++) {
      let cidade = indicadores.cidades[i];
      indicadores.valoresIndicadores[i].push(json.data[j][cidade]);
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

  for (let i = 0; i < metas.cidades.length; i++) {
    metas.valoresMetas[i] = [];
    for (let j = 0; j < json.data.length; j++) {
      let cidade = metas.cidades[i];
      metas.valoresMetas[i].push(json.data[j][cidade]);
    }
  }

  return metas;
}
