import axios from "axios";

const headers = {
  "x-access-token": localStorage.getItem("token_acesso"),
};

export async function getCidades() {
  try {
    const requisicao = await axios.get("http://localhost:3000/cidades");
    console.log(requisicao);
    if (requisicao.status === 200) {
      return requisicao.cidades;
    }
  } catch (erro) {
    return erro;
  }
}

export async function importarIndicadores(jsonIndicadores) {
  try {
    const requisicao = await axios.post(
      "http://localhost:3000/lancamentosIndicadores",
      jsonIndicadores,
      { headers }
    );
    console.log(requisicao);
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}

export async function importarMetas(jsonMetas) {
  try {
    const requisicao = await axios.post(
      "http://localhost:3000/lancamentosMetas",
      jsonMetas,
      { headers }
    );
    return requisicao.status;
  } catch (erro) {
    return erro;
  }
}
