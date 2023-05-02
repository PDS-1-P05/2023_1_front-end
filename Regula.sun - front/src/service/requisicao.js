import axios from "axios";
import { config } from "../../config/config.js";
const BASE_URL = config.BASE_URL;

const headers = {
  "x-access-token": localStorage.getItem("token_acesso"),
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
      { headers }
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
      { headers }
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}
