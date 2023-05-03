import axios from "axios";
import { config } from "../../config/config.js";
const BASE_URL = config.BASE_URL;

const config = {
  headers: {
      "x-access-token": localStorage.getItem("token_acesso"),
      "content-type": "application/json"
  }
};

export async function getCidades() {
  try {
    const requisicao = await axios.get(
      BASE_URL + "/cidades"
    );
    if (requisicao.status === 200) {
      return requisicao;
    }
  } catch (erro) {
    return erro;
  }
}

export async function importarIndicadores(jsonIndicadores) {
  try {
    const requisicao = await axios.post(
      BASE_URL + "/lancamentosIndicadores",
      jsonIndicadores,
      config
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function importarMetas(jsonMetas) {
  try {
    const requisicao = await axios.post(
      BASE_URL + "/lancamentosMetas",
      jsonMetas,
      config
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}
