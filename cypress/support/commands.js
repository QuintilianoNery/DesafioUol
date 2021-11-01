// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Comandos personalizados comuns a todos os testes

Cypress.Commands.add('backgroundLogin', () => {
    //cookie de autenticação
    //passando da guia application o nome e o valor
    cy.setCookie(
        'PrestaShop-a30a9934ef476d11b6cc3c983616e364',
        'R6xmma6F4U6edNQuu67M0lYyG4p0n2Uj%2F%2B75zRUmzBWS%2FhpFBJtY0v0dNeXhYw4PbF5cMFyXu%2BagQjT7RandwxjVlDdhpC0yiFq9prxeX7kO25%2BLZrsKuBM7eFYMJDSjKx%2BX0hpaqVOfOTpd6B%2BM%2BnW2AfmOXAjVHSnJ8AXXBTWU70p%2FWkZQu5VE4Ylw15vkFjODpeEzNVqguWv%2BDs7EWAaRTBHlT5oK33RSpBLB5KkX8I5ObdE1tJVERFGGfEWnkdViuhrvuNPqfRS%2F8%2FRfTdC7%2BpTxPsBZXMAPVwd5k0bTeLV%2FNcPKBuMZ51lEsS0r8tspyfSWtGmpQJhUdYcn5rxpreWVe7ZSCS69H%2BCeSGVIlJ1G%2B991po9oiqTiSoyukGYD2pXk%2BAvwRTV1pn0v0ux5Zm0fP%2BUURLVMGshAigU%3D000311'
    );
})