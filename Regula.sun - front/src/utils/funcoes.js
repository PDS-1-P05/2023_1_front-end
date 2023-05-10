import Papa from "papaparse";
import { getCidades, getIndicadores } from "../service/requisicao";

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

export async function validarTemplate(json, tipo) {
  var templateArquivo;
  var validacao = {
    ano: false,
    cidades: false,
    indicadores: false,
    cidFaltando: [],
    cidEmAcrescimo: [],
    cidForaOrdem: [],
    indFaltando: [],
    indEmAcrescimo: [],
    indForaOrdem: [],
  };

  const templateBanco = await retornarTemplateBanco();

  if (tipo === "indicadores") {
    templateArquivo = templateIndiArquivo(json);
  } else if (tipo === "metas") {
    templateArquivo = templateMetasArquivo(json);
    validacao.ano = templateArquivo.ano;
  }

  const validaCidade = validarCidades(templateArquivo, templateBanco);
  validacao.cidades = validaCidade.valido;
  validacao.cidFaltando = validaCidade.cidFaltando;
  validacao.cidEmAcrescimo = validaCidade.cidEmAcrescimo;
  validacao.cidForaOrdem = validaCidade.cidForaOrdem;

  const validaIndicadores = validarIndicadores(templateArquivo, templateBanco);
  validacao.indicadores = validaIndicadores.valido;
  validacao.indFaltando = validaIndicadores.indFaltando;
  validacao.indEmAcrescimo = validaIndicadores.indEmAcrescimo;
  validacao.indForaOrdem = validaIndicadores.indForaOrdem;

  return validacao;
}

export function templateIndiArquivo(json) {
  var templateArquivo = {
    cidades: [],
    indicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Indicadores") {
      templateArquivo.cidades.push(coluna);
    }
  }

  const indicadores = retornarDados(json, "Indicadores");
  templateArquivo.indicadores = indicadores;

  return templateArquivo;
}

export function templateMetasArquivo(json) {
  var templateArquivo = {
    ano: false,
    cidades: [],
    indicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna === "Ano") {
      templateArquivo.ano = true;
    } else if (coluna !== "Metas" && coluna !== "Ano") {
      templateArquivo.cidades.push(coluna);
    }
  }

  const indicadores = retornarDados(json, "Metas");
  templateArquivo.indicadores = indicadores;

  return templateArquivo;
}

export async function retornarTemplateBanco() {
  var dadosBanco = {
    cidades: [],
    indicadores: [],
  };

  const jsonCidades = await getCidades();
  const cidades = retornarDados(jsonCidades, "nome");
  dadosBanco.cidades = cidades;

  const jsonIndicadores = await getIndicadores();
  const indicadores = retornarDados(jsonIndicadores, "criterio");
  dadosBanco.indicadores = indicadores;

  return dadosBanco;
}

export function retornarDados(json, stringBusca) {
  var array = [];

  for (var linha = 0; linha < json.data.length; linha++) {
    for (const [coluna, valor] of Object.entries(json.data[linha])) {
      if (coluna === stringBusca) {
        array.push(valor);
      }
    }
  }

  return array;
}

export function validarCidades(templateArquivo, templateBanco) {
  var validacao = {
    valido: true,
    cidEmAcrescimo: [],
    cidFaltando: [],
    cidForaOrdem: [],
  };

  const cidFaltando = templateBanco.cidades.filter((cidades) => !templateArquivo.cidades.includes(cidades));
  validacao.cidFaltando.push(cidFaltando);

  const cidEmAcrescimo = templateArquivo.cidades.filter((cidades) => !templateBanco.cidades.includes(cidades));
  validacao.cidEmAcrescimo.push(cidEmAcrescimo);

  if (cidFaltando.length > 0 || cidEmAcrescimo.length > 0) {
    validacao.valido = false;
    return validacao;
  }

  else if (cidFaltando.length === 0 && cidEmAcrescimo.length === 0) {
    const cidForaOrdem = verificarOrdemCidades(templateArquivo, templateBanco);
    if (cidForaOrdem.length > 0) {
      validacao.cidForaOrdem.push(cidForaOrdem);
      validacao.valido = false;
      return validacao;
    }
  }

  return validacao;
}

export function verificarOrdemCidades(templateArquivo, templateBanco){
  const cidForaOrdem = [];

  for (var cidade = 0; cidade < templateBanco.cidades.length; cidade++) {
    if (templateBanco.cidades[cidade] !== templateArquivo.cidades[cidade]) {
      cidForaOrdem.push(templateArquivo.cidades[cidade]);
    }
  }

  return cidForaOrdem;
}

export function validarIndicadores(templateArquivo, templateBanco) {
  const arqIndi = templateArquivo.indicadores;
  const banIndi = templateBanco.indicadores;
  var validacao = {
    valido: true,
    indEmAcrescimo: [],
    indFaltando: [],
    indForaOrdem: [],
  };

  var templateArquivoFormatado = arqIndi.map(function (indicador) {
    return indicador.replace(/\(.*\)/g, "").trim();
  });

  const indFaltando = banIndi.filter((indicadores) => !templateArquivoFormatado.includes(indicadores));
  validacao.indFaltando.push(indFaltando);

  const indEmAcrescimo = templateArquivoFormatado.filter((indicadores) => !banIndi.includes(indicadores));
  validacao.indEmAcrescimo.push(indEmAcrescimo);

  if (indFaltando.length > 0 || indEmAcrescimo.length > 0) {
    validacao.valido = false;
    return validacao;
  }

  else if (indFaltando.length === 0 && indEmAcrescimo.length === 0) {
    const indForaOrdem = verificarOrdemIndicadores(templateArquivoFormatado, banIndi);
    if (indForaOrdem.length > 0) {
      validacao.indForaOrdem.push(indForaOrdem);
      validacao.valido = false;
      return validacao;
    }
  }

  return validacao;
}

export function verificarOrdemIndicadores(templateArquivoFormatado, banIndi){
  const cidForaOrdem = [];

  for (var indicador = 0; indicador < banIndi.length; indicador++) {
    if (banIndi[indicador] !== templateArquivoFormatado[indicador]) {
      cidForaOrdem.push(templateArquivoFormatado[indicador]);
    }
  }

  return cidForaOrdem;
}