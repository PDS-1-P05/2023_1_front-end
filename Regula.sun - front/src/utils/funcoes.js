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
