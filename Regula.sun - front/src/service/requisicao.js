import axios from "axios";

export async function getCidades() {
  try {
    const requisicao = await axios.get("https://regula-sun.up.railway.app/cidades");

        if (requisicao.status === 200) {
        return requisicao;
        }}catch(erro) {
    console.log(erro);
  }

}