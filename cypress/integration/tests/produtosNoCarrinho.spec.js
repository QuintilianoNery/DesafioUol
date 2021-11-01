/// <reference types="cypress" />

//A URL padrão está configurada em cypress.json

//Em todo o fluxo de compra, para cada página existe uma determinada validação, que faz e auxilia a garantia de que o produto correto está sendo selecionado
describe('Inclusão de produtos Automationpractice', () => {
    //Este teste foi realizado para identificar o processo completo de compras.
    it('Inclusão de produto no carrinho com conclusão de pedido', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome do produto1
        let nomeProduto1 = 'Faded Short Sleeve T-shirts';

        cy.get('input[id=search_query_top]')
            .type(nomeProduto1);

        //Clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click();

        //Clicar no botão mais informações
        cy.get('a[title=View]')
            .click();

        //Verificar se o protudo da tela é o desejado
        cy.get('h1[itemprop=name]')
            .should('contain.text', nomeProduto1);

        //verificar quantidade de produtos
        cy.get('a.product_quantity_up')
            .click()
            .click();

        cy.get('a.product_quantity_down')
            .click()
            .click();

        //Verificar cor do produto
        cy.get('a[id=color_14]')
            .click();

        cy.get('a[id=color_13]')
            .click();

        //Incluir produto no carrinho
        cy.get('button[name=Submit]')
            .click();

        //validar se o produto foi adicionado ao carrinho com sucesso
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto1);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1')

        //Clicar no botão de checkout
        cy.get(".button-container a[href$='controller=order']")
            .click();

        //Página de informações dos produtos no cartrinho
        //Clicar no botão para continuar com o checkout
        cy.get(".cart_navigation a[href$='order&step=1']")
            .click();

        //Efetuar login
        cy.get('#email')
            .type('q@qa.com');
        cy.get('#passwd')
            .type('12345');
        cy.get('button#SubmitLogin')
            .click();

        //validação na tela de confirmação de endereços
        cy.get('input[id=addressesAreEquals]')
            .should('have.attr', 'checked', 'checked');
        cy.get('input[id=addressesAreEquals]')
            .should('have.attr', 'name', 'same');

        //clicar no botão continuar com o checkout da tela de endereços
        cy.get('button[name=processAddress]')
            .click();

        //Etapa de entrega
        //Marcar que aceita os termos de serviços
        cy.get('input[id=cgv]')
            .check();

        //clicar no botão continuar com o checkout da tela de endereços
        cy.get('button[name=processCarrier]')
            .click();

        //Clicar na forma de pagamento Cartão de crédito
        cy.get('.bankwire')
            .click();

        //Clicar no botão "Eu confirmo meu pedido" com base no nome do botão
        cy.get('.cart_navigation button[type=submit]')
            .find('span')
            .contains("I confirm my order")
            .click();

        //Clicar na logo e voltar para a página inicial
        cy.get('div[id=header_logo]')
            .click()

        //Validação da URL da página inicial
        cy.url()
            .should('contain', '/index.php')
            .should('eq', 'http://automationpractice.com/index.php')
    });

    //Este teste foi criado para validar a inclusão normal de um produto no carrinho seguido da exclusão, o que pode ocorrer com noemalidade em um fluxo de compras
    it('Inclusão de um produto no carrinho com exclusão de produto', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome do produto1
        let nomeProduto1 = 'Faded Short Sleeve T-shirts';

        cy.get('input[id=search_query_top]')
            .type(nomeProduto1);

        //Clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click();

        //Clicar no botão mais informações
        cy.get('a[title=View]')
            .click();

        //Verificar se o protudo da tela é o desejado
        cy.get('h1[itemprop=name]')
            .should('contain.text', nomeProduto1);

        //verificar quantidade de produtos
        cy.get('a.product_quantity_up')
            .click()
            .click();

        cy.get('a.product_quantity_down')
            .click()
            .click();

        //Verificar cor do produto
        cy.get('a[id=color_14]')
            .click();

        cy.get('a[id=color_13]')
            .click();

        //Incluir produto no carrinho
        cy.get('button[name=Submit]')
            .click();

        //validar se o produto foi adicionado ao carrinho com sucesso
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto1);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1')

        //Clicar no botão de checkout
        cy.get(".button-container a[href$='controller=order']")
            .click();

        //Página de informações dos produtos no cartrinho
        cy.url()
            .should('contain', '/index.php?controller=order')
            .should('eq', 'http://automationpractice.com/index.php?controller=order');

        //Excluir peoduto do carrinho
        cy.get('a[id="1_1_0_0"]')
            .click()

        cy.get('p[class="alert alert-warning"]')
            .should('have.text', 'Your shopping cart is empty.')
            .should('contain', 'Your shopping cart is empty.')

    });

    //Este teste foi penssado em um fluxo de compras, onde o usuário faz de várias formas a inclusão dos produtos no carrinho. 
    it('Inclusão de produto no carrinho com escolha de mais produtos', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome dos produtos
        let nomeProduto1 = 'Faded Short Sleeve T-shirts';
        let nomeProduto2 = 'Printed Chiffon Dress';
        let nomeProduto3 = 'Blouse';

        //Selecionar produto 1
        cy.get('input[id=search_query_top]')
            .type(nomeProduto1);

        //Clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click();

        //Clicar no botão mais informações
        cy.get('a[title=View]')
            .click();

        //Verificar se o protudo da tela é o desejado
        cy.get('h1[itemprop=name]')
            .should('contain.text', nomeProduto1);

        //verificar quantidade de produtos
        cy.get('a.product_quantity_up')
            .click()
            .click();

        cy.get('a.product_quantity_down')
            .click()
            .click();

        //Verificar cor do produto
        cy.get('a[id=color_14]')
            .click();

        cy.get('a[id=color_13]')
            .click();

        //Incluir produto no carrinho
        cy.get('button[name=Submit]')
            .click();

        //validar se o produto foi adicionado ao carrinho com sucesso
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto1);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1')

        //Clicar no botão de checkout
        cy.get(".button-container a[href$='controller=order']")
            .click();

        //Página de informações dos produtos no cartrinho
        cy.url()
            .should('contain', '/index.php?controller=order')
            .should('eq', 'http://automationpractice.com/index.php?controller=order');


        //Clicar na home para continuar comprando
        cy.get('div[id=header_logo]')
            .click()

        //Validação da URL da página inicial
        cy.url()
            .should('contain', '/index.php')
            .should('eq', 'http://automationpractice.com/index.php')

        //Clicar no produto 2, selecionando o primeiro item da seleção
        cy.get('img[title="Printed Chiffon Dress"]')
            .first()
            .click()

        //Conferindo se o produto clicado é o correto
        cy.get('h1[itemprop=name]')
            .contains(nomeProduto2)
            .should('have.text', nomeProduto2)
            .should('contain.text', nomeProduto2)

        //Verificar imagem do produto
        cy.get('img[title="Printed Chiffon Dress"]')
            .first()
            .click()

        //Passar para outras imagens do produto
        cy.get('a[class="fancybox-nav fancybox-next"]')
            .click()

        //Fechar visualização de foto
        cy.get('a[title="Close"]')
            .click()

        //Clicar no botão adicionar produto ao carrinho
        cy.get('p[id=add_to_cart] button[type=submit]')
            .click();

        //Verificar se o segundo produto foi adiconado corretamente
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto2);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1');

        //clicar no botão de continuar comprando
        cy.get('span[title="Continue shopping"]')
            .click()

        //Incluir produto 3
        // Pesquisar produto 3 para compra
        cy.get('input[id=search_query_top]')
            .type(nomeProduto3)

        //clicar no botão pesquisar
        cy.get('button[name=submit_search]')
            .click()

        cy.get('a[title="Add to cart"][data-id-product="2"]')
            .click()

        //Verificar se o segundo produto foi adiconado corretamente
        cy.get('.icon-ok')
            //h2
            .parent('')
            .should('contain.text', 'Product successfully added to your shopping cart');

        //Validar se o nome do produto é o mesmo informado na home page
        cy.get('span[id=layer_cart_product_title]')
            .should('contain.text', nomeProduto3);

        //Verificar quantidade de produtos no carrinho 
        cy.get('span[id="layer_cart_product_quantity"]')
            .should('contain', '1');

        //Continuar para o checkout
        cy.get('a[title="Proceed to checkout"]')
            .click()
    });

});