<h1 align="center">Projeto: DesafioUol utilizando Cypress </h1>

<p align="center"><img src="DesafioUOL.png" width="100%"/></p>

--------

## Configurando o Ambiente :gear:

- [Cypress.io](http://www.cypress.io)

- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

### Requisitos para instalação

- [Node.js](https://nodejs.org/en/)
- [Java 8 ou superrior caso use o Allure Report](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244036_89d678f2be164786b292527658ca1605)

### Instalação do NPM e instalação do Cypress

Na pasta do projeto abra o terminal ou no VSCode use o Ctrl + ' (aspas simples), e digite os comandos abaixo para instalação das dependências do projeto:

```shell
npm init -y
npm install --save-dev --yes
npm install cypress@6.9.1 --save-dev
npm install cypress-cucumber-preprocessor --save-dev
npm i fs-extra --save-dev
npm install jsonschema --save-dev
npm install rimraf --save-dev

```
OBS: Instalação da versão 6.9.1 pois está bem estável. Outro motivo é que não verifiquei as mudanças das novas versões, com isso prefiro usar neste projeto esta versão do Cypress.

### Instalação/configuração Allure Report
- Configuração e uso do Allure-Report: [Allure Report](https://github.com/QuintilianoNery/DesafioUol/blob/origin/arquivos/configuracaoAllure-Report.md)


### Comandos para iniciar o Cypress :gear:

#### Iniciar o Cypress no navegador:

```shell
   npx cypress open
```

#### Para executar em modo headless:

```shell
   npx cypress run
```
-----
### Resultados obtidos no desafio

- Site de compras utilizado: [automationpractice.com](http://automationpractice.com/)

- Casos de teste criados: [Casos de teste](https://github.com/QuintilianoNery/DesafioUol/blob/origin/arquivos/casosDeTeste.txt)


- Relatório no github-pages, através de CI: [Github-pages CI](https://github.com/QuintilianoNery/DesafioUol/deployments/activity_log?environment=github-pages)

- Cypress dashboard: [Cypress dashboard](https://dashboard.cypress.io/projects/3j36ij/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D)
