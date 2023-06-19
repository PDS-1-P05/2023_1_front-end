# Regula.sun - front

## Requisitos
  - Instalar [NodeJS](https://nodejs.org/en) 18.15.0 ou superior.
  - Instalar [Docker](https://docs.docker.com/desktop/install/windows-install/) 4.17.1 ou superior.
  - Instalar [Git](https://git-scm.com/downloads) 2.40.0 ou superior.
  
## Ambiente de Desenvolvimento
  1. Instale o editor de código de sua preferência.
  2. Abra o terminal _Git Bash_ em um diretório qualquer.
  3. Faça a configuração inicial no terminal _Git Bash_ rodando os seguintes comandos:
  ````sh
    git config --global user.name seu_username_do_git
  ````
  ````sh
    git config --global user.email seu_email_do_git
  ````
  4. Clone o repositório **2023_1_front-end**. No terminal _Git Bash_ execute:
  ````sh
  git clone https://github.com/PDS-1-P05/2023_1_front-end.git
  ````
  5. No terminal, entre no diretório do projeto clonado executando:
  ````sh
    cd 2023_1_front-end/
  ````
  6. Após a finalização da clonagem, ainda no _Git Bash_, migre para a branch _develop_ executando o comando:
  ````sh
  git checkout develop
  ````
  7. Atualize os arquivos do repositório local com o comando:
  ````sh
  git pull origin develop
  ````
  8. Ao terminar de atualizar o projeto, abra o repositório local no editor escolhido.
  9. Na pasta "**_Regula.sun - front_**" existe uma pasta chamada _"configExample"_ contendo um arquivo _"configExample.js"_, crie (ou apenas renomeie) a pasta e o arquivo com nomes _"config"_ e _"config.js"_ e altere o link do _"BASE_URL"_ do arquivo _"config.js"_ para o link da variável de ambiente de desenvolvimento localizado na seção abaixo.
  10. Abra o terminal de sua preferência (CMD, Powershell ou do próprio editor) e acesse o diretório _“2023_1_front-end\Regula.sun - front”_.
  11. Para instalar as dependências do projeto, no terminal, execute o seguinte comando:
  ````sh
  npm install
  ````
  12. Ainda no terminal, para inicializar o localhost execute:
  ````sh
  npm run dev
  ````
  13. Vai ser exibido uma mensagem pop-up que gera um certificado digital com uma chave SSL para que o link gerado pelo _"npm run dev"_, seja HTTPS, basta clicar em SIM.
  14. Abra o localhost em qualquer navegador (https://localhost:5173/2023_1_front-end).
  
## Variaveis de Ambiente de Desenvolvimento
  | Variavel  | Valor |
  | --------- | --------- |
  | <BASE_URL> | <http://localhost:3000> |
  
## Recomendações
  - Editor: VSCode.
  - Programas: Postman, GitHub CLI.
  - Extensões VSCode: Git Graph, Postman, Thunder Client, GitHub Pull Requests and Issues, Vue VSCode Snippets e JavaScript (ES6) code snippets.
