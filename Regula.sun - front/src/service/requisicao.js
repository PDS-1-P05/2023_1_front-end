import axios from "axios";
import { config } from "../../config/config.js";
const BASE_URL = config.BASE_URL;

export async function getMunicipios() {
  try {
    const requisicao = await axios.get(
      BASE_URL + "/municipios"
    );
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function getIndicadores() {
  try {
    const requisicao = await axios.get(
      BASE_URL + "/indicadores"
    );
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function getDadosGrafico(municipiosIndicadores) {
  try {
    const requisicao = await axios.post(BASE_URL + "/grafico", municipiosIndicadores);
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function importarIndicadores(jsonIndicadores) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };
  try {
    const requisicao = await axios.post(
      BASE_URL + "/lancamentosIndicadores",
      jsonIndicadores,
      configHeader
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function importarMetas(jsonMetas) {
  const configHeader = {
    headers: {
        "x-access-token": localStorage.getItem("token_acesso"),
        "content-type": "application/json"
    }
  };
  try {
    const requisicao = await axios.post(
      BASE_URL + "/lancamentosMetas",
      jsonMetas,
      configHeader
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function getRanking() {
  try {
    const requisicao = await axios.get(
      BASE_URL + "/ranking"
    );
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}
    
export async function getBoletim(id, ano) {
  try {
    const requisicao = await axios.get(
      BASE_URL + "/boletim" + "/" + id + "/" + ano,
    );
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}