import axios from "axios";
import jwt_decode from "jwt-decode";

export async function fazerLogin(dadosLogin) {
  try {
    const requisicao = await axios.post(
      "http://localhost:3000/autenticar",
      dadosLogin
    );

    if (requisicao.status === 200) {
      localStorage.setItem("token_acesso", requisicao.data.token);
      localStorage.setItem("email_usuario", dadosLogin.email);
      return requisicao.status;
    } else {
      return requisicao.status;
    }
  } catch (erro) {
    return erro;
  }
}

export async function validarTokenAcesso() {
  const token_acesso = localStorage.getItem("token_acesso");

  if (token_acesso) {
    const decodificarToken = jwt_decode(token_acesso);
    const tempoExpiracao = decodificarToken.exp * 1000;

    if (Date.now() > tempoExpiracao) {
      localStorage.removeItem("token_acesso");
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
