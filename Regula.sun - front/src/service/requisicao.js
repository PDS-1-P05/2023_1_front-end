import axios from "axios";

export async function getCidades() {
    await axios.get("http://localhost:3000/cidades")
    .then((resposta) => {
        if (resposta.status == 200) {
        return cidades;
        } else if (resposta.status == 500) { // Erro interno do servidor
        return 500
        }
  }).catch((e) => {
    console.log(e);
  });

}