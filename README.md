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

```
2023.1_front-end
├─ docs
│  ├─ amarelo.svg
│  ├─ assets
│  │  ├─ AGEMS-0e574ee1.svg
│  │  ├─ agemsSVG-7d1d6b44.svg
│  │  ├─ amarelo-768ccc9d.svg
│  │  ├─ azul-0d87521e.svg
│  │  ├─ BOLETIM-25d567cd.png
│  │  ├─ CHARTS-bb4d40b5.png
│  │  ├─ html2canvas-f100033d.js
│  │  ├─ imagem_login-9709b35c.svg
│  │  ├─ imagem_upload-83831933.svg
│  │  ├─ index-41b6ead0.js
│  │  ├─ index-c181fd9b.css
│  │  ├─ index.es-1262900a.js
│  │  ├─ laranja-e5bc1ed7.svg
│  │  ├─ materialdesignicons-webfont-67d24abe.eot
│  │  ├─ materialdesignicons-webfont-80bb28b3.woff
│  │  ├─ materialdesignicons-webfont-a58ecb54.ttf
│  │  ├─ materialdesignicons-webfont-c1c004a9.woff2
│  │  ├─ MEDALHA-DE-BRONZE-48f1cecd.svg
│  │  ├─ MEDALHA-DE-OURO-5383d6f1.svg
│  │  ├─ MEDALHA-DE-PRATA-905b0299.svg
│  │  ├─ NES-e5f33cbe.svg
│  │  ├─ preto-adcb06be.svg
│  │  ├─ purify.es-f47f2ec0.js
│  │  ├─ REGULASUN-88e715be.svg
│  │  ├─ UFMS-LOGO-47918312.svg
│  │  ├─ verde-9aeaf379.svg
│  │  └─ vermelho-4a8bd8e7.svg
│  ├─ azul.svg
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ laranja.svg
│  ├─ preto.svg
│  ├─ verde.svg
│  └─ vermelho.svg
├─ README.md
└─ Regula.sun - front
   ├─ .envExample
   ├─ .eslintrc.json
   ├─ .vscode
   │  └─ extensions.json
   ├─ config
   │  └─ config.js
   ├─ configExample
   │  └─ configExample.js
   ├─ cypress
   │  ├─ downloads
   │  ├─ e2e
   │  │  ├─ H006.cy.js
   │  │  ├─ H007.cy.js
   │  │  ├─ H008.cy.js
   │  │  └─ H010.cy.js
   │  ├─ fixtures
   │  │  ├─ example.json
   │  │  ├─ Indicador - Agua ClarO.csv
   │  │  ├─ Indicador - Alcinopolis e Amambai trocados.csv
   │  │  ├─ Indicador - Campo Vazio.csv
   │  │  ├─ Indicador - Cidade Guilherme, Miranda removido.csv
   │  │  ├─ Indicador - Indicador Guilherme e Sem Reservação e Hidrometração.csv
   │  │  ├─ Indicador - PASSA.csv
   │  │  ├─ Indicador - População UrbanO.csv
   │  │  ├─ Indicador - Reservação e Extensao de Rede trocados.csv
   │  │  ├─ Indicador - Sem Alcinopolis e Amambai.csv
   │  │  ├─ Indicador - Sem Habitantes por domicílio e Renda per capita.csv
   │  │  ├─ Meta - Agua ClarO.csv
   │  │  ├─ Meta - Alcinopolis e Amambai trocados.csv
   │  │  ├─ Meta - Campo Vazio.csv
   │  │  ├─ Meta - Cidade Guilherme, Miranda removido.csv
   │  │  ├─ Meta - Indicador Guilherme e Sem Reservação e Hidrometração.csv
   │  │  ├─ Meta - PASSA.csv
   │  │  ├─ Meta - População UrbanO.csv
   │  │  ├─ Meta - Reservação e Extensao de Rede trocados.csv
   │  │  ├─ Meta - Sem Alcinopolis e Amambai.csv
   │  │  ├─ Meta - Sem Ano.csv
   │  │  ├─ Meta - Sem Habitantes por domicílio e Renda per capita.csv
   │  │  └─ teste.pdf
   │  └─ support
   │     ├─ commands.js
   │     └─ e2e.js
   ├─ cypress.config.js
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ amarelo.svg
   │  ├─ azul.svg
   │  ├─ favicon.ico
   │  ├─ laranja.svg
   │  ├─ preto.svg
   │  ├─ verde.svg
   │  └─ vermelho.svg
   ├─ src
   │  ├─ App.vue
   │  ├─ assets
   │  │  ├─ AGEMS.svg
   │  │  ├─ agemsSVG.svg
   │  │  ├─ amarelo.svg
   │  │  ├─ azul.svg
   │  │  ├─ BOLETIM.png
   │  │  ├─ CHARTS.png
   │  │  ├─ imagem_login.svg
   │  │  ├─ imagem_upload.svg
   │  │  ├─ laranja.svg
   │  │  ├─ MEDALHA-DE-BRONZE.svg
   │  │  ├─ MEDALHA-DE-OURO.svg
   │  │  ├─ MEDALHA-DE-PRATA.svg
   │  │  ├─ NES.svg
   │  │  ├─ preto.svg
   │  │  ├─ REGULASUN.svg
   │  │  ├─ UFMS-LOGO.svg
   │  │  ├─ verde.svg
   │  │  └─ vermelho.svg
   │  ├─ components
   │  │  ├─ AdminNavTab.vue
   │  │  ├─ AlertaInfo.vue
   │  │  ├─ DefaultButton.vue
   │  │  ├─ DragNDrop.vue
   │  │  ├─ FiltroIndicador.vue
   │  │  ├─ FiltroMunicipio.vue
   │  │  ├─ GraficoComponent.vue
   │  │  ├─ HomeButton.vue
   │  │  ├─ HomeFooter.vue
   │  │  ├─ ModeloBoletim.vue
   │  │  ├─ NavBar.vue
   │  │  ├─ RankingMunicipios.vue
   │  │  ├─ Select.vue
   │  │  ├─ SelectBoletim.vue
   │  │  ├─ VisualizacaoIndicadores.vue
   │  │  └─ VisualizacaoMetas.vue
   │  ├─ main.js
   │  ├─ router
   │  │  └─ index.js
   │  ├─ service
   │  │  ├─ autenticacao.js
   │  │  └─ requisicao.js
   │  ├─ store
   │  │  └─ index.js
   │  ├─ utils
   │  │  └─ funcoes.js
   │  └─ views
   │     ├─ AdminView.vue
   │     ├─ BoletimView.vue
   │     ├─ GraficoView.vue
   │     ├─ HomeView.vue
   │     └─ LoginView.vue
   ├─ vite.config.js
   └─ __tests__
      ├─ AdminNavTab.test.js
      ├─ DragNDrop.test.js
      ├─ HomeButton.test.js
      ├─ HomeFooter.test.js
      ├─ HomeView.test.js
      ├─ ImportButton.test.js
      ├─ LoginView.test.js
      └─ Navbar.test.js

```