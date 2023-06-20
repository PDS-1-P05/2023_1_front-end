import Papa from "papaparse";
import { getMunicipios, getIndicadores } from "../service/requisicao";

export function processarArquivo(arquivoCSV) {
  const config = {
    delimiter: ",",
    header: true,
    transform: (value) => transformarValor(value),
  };

  const result = Papa.parse(arquivoCSV, config);
  return result;
}

function transformarValor(value) {
  if (value === "-") {
    value = "-1";
  }

  value = value.replace(',', '.')
  return value
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
    municipios: [],
    valoresIndicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Indicadores") {
      indicadores.municipios.push(coluna);
    }
  }

  for (let municipio = 0; municipio < indicadores.municipios.length; municipio++) {
    indicadores.valoresIndicadores[municipio] = [];
    for(let linha = 0; linha < json.data.length; linha++) {
      let municipioIndi = indicadores.municipios[municipio];
      indicadores.valoresIndicadores[municipio].push(json.data[linha][municipioIndi])
    }
  }

  return indicadores;
}

export function formatarMetas(json) {
  var metas = {
    emailUsuario: localStorage.getItem("email_usuario"),
    municipios: [],
    ano: "",
    valoresMetas: [],
  };

  metas.ano = json.data[0]["Ano"];

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Metas" && coluna !== "Ano") {
      metas.municipios.push(coluna);
    }
  }

  for (let municipio = 0; municipio < metas.municipios.length; municipio++) {
    metas.valoresMetas[municipio] = [];
    for(let linha = 0; linha < json.data.length; linha++) {
      let municipioMeta = metas.municipios[municipio];
      metas.valoresMetas[municipio].push(json.data[linha][municipioMeta])
    }
  }

  return metas;
}

export async function validarTemplate(json, tipo) {
  var templateArquivo;
  var validacao = {
    ano: false,
    municipios: false,
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

  const validaMunicipio = validarMunicipios(templateArquivo, templateBanco);
  validacao.municipios = validaMunicipio.valido;
  validacao.cidFaltando = validaMunicipio.cidFaltando;
  validacao.cidEmAcrescimo = validaMunicipio.cidEmAcrescimo;
  validacao.cidForaOrdem = validaMunicipio.cidForaOrdem;

  const validaIndicadores = validarIndicadores(templateArquivo, templateBanco);
  validacao.indicadores = validaIndicadores.valido;
  validacao.indFaltando = validaIndicadores.indFaltando;
  validacao.indEmAcrescimo = validaIndicadores.indEmAcrescimo;
  validacao.indForaOrdem = validaIndicadores.indForaOrdem;

  return validacao;
}

export function templateIndiArquivo(json) {
  var templateArquivo = {
    municipios: [],
    indicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna !== "Indicadores") {
      templateArquivo.municipios.push(coluna);
    }
  }

  const indicadores = retornarDados(json, "Indicadores");
  templateArquivo.indicadores = indicadores;

  return templateArquivo;
}

export function templateMetasArquivo(json) {
  var templateArquivo = {
    ano: false,
    municipios: [],
    indicadores: [],
  };

  for (const [coluna] of Object.entries(json.data[0])) {
    if (coluna === "Ano") {
      templateArquivo.ano = true;
    } else if (coluna !== "Metas" && coluna !== "Ano") {
      templateArquivo.municipios.push(coluna);
    }
  }

  const indicadores = retornarDados(json, "Metas");
  templateArquivo.indicadores = indicadores;

  return templateArquivo;
}

export async function retornarTemplateBanco() {
  var dadosBanco = {
    municipios: [],
    indicadores: [],
  };

  const jsonMunicipios = await getMunicipios();
  const municipios = retornarDados(jsonMunicipios, "nome");
  dadosBanco.municipios = municipios;

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

export function validarMunicipios(templateArquivo, templateBanco) {
  var validacao = {
    valido: true,
    cidEmAcrescimo: [],
    cidFaltando: [],
    cidForaOrdem: [],
  };

  const cidFaltando = templateBanco.municipios.filter((municipios) => !templateArquivo.municipios.includes(municipios));
  validacao.cidFaltando.push(cidFaltando);

  const cidEmAcrescimo = templateArquivo.municipios.filter((municipios) => !templateBanco.municipios.includes(municipios));
  validacao.cidEmAcrescimo.push(cidEmAcrescimo);

  if (cidFaltando.length > 0 || cidEmAcrescimo.length > 0) {
    validacao.valido = false;
    return validacao;
  }

  else if (cidFaltando.length === 0 && cidEmAcrescimo.length === 0) {
    const cidForaOrdem = verificarOrdemMunicipios(templateArquivo, templateBanco);
    if (cidForaOrdem.length > 0) {
      validacao.cidForaOrdem.push(cidForaOrdem);
      validacao.valido = false;
      return validacao;
    }
  }

  return validacao;
}

export function verificarOrdemMunicipios(templateArquivo, templateBanco){
  const cidForaOrdem = [];

  for (var municipio = 0; municipio < templateBanco.municipios.length; municipio++) {
    if (templateBanco.municipios[municipio] !== templateArquivo.municipios[municipio]) {
      cidForaOrdem.push(templateArquivo.municipios[municipio]);
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

export function validarValoresNulos(json, colunaInicial) {
  let mensagem = '';

  const dados = json.data
  for (let linha = 0; linha < dados.length; linha++) {
    const indicador = dados[linha][colunaInicial]

    for (const municipio in dados[linha]) {
      if (municipio !== colunaInicial) {
        const valor = dados[linha][municipio];

        if (!valor || valor.trim() === '') {
          mensagem += `Valor vazio encontrado na COLUNA: ${municipio}, INDICADOR: ${indicador}<br><br>`;
        }
      }
    }
  }

  if (mensagem.length === 0) { return false }
  return mensagem;
}