# Allure Report #

Link:
- [Allure Commandline](https://www.npmjs.com/package/allure-commandline "allure-commandline")
- [Java como Pré requisito do relatório](https://www.npmjs.com/package/java "java")
- [Cypress Allure Plugin](https://www.npmjs.com/package/@shelex/cypress-allure-plugin "cypress-allure-plugin")
- [Gerar relatório em HTML](https://docs.qameta.io/allure/#_configuration_4 "gerar-em-html")
- [Rimraf](https://www.npmjs.com/package/rimraf "rimraf")


Comandos usados:

- Instalar allure-commandline
```shell
npm install -g allure-commandline --save-dev
```
- Instalar o Java, caso não exista
```shell
npm install java
```
- Instalar o cypress-allure-plugin
```shell
npm i -D @shelex/cypress-allure-plugin
```
- Conectar  cypress-allure-plugin em `cypress/plugins/index.js`

```shell
            const allureWriter = require('@shelex/cypress-allure-plugin/writer');
            module.exports = (on, config) => {
                allureWriter(on, config);
                return config;
            };
```

- Registrar comandos em `cypress/support/index.js`
```shell
            import '@shelex/cypress-allure-plugin';
            require('@shelex/cypress-allure-plugin');
```

-----

## Para executar localmente o relatório Allure, deve-se seguir os seguintes passos: ##

- Executar comando para capturar resultados dos testes

```shell
    npx cypress run --config video=true --env allure=true --browser chrome
```
- Gerar relatório em HTML
```shell
allure generate allure-results
```
- Abrir relatório no navegador
```shell
allure open allure-report
```
- Instalando o rimraf
```shell
npm install -D rimraf
```
