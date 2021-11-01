/// <reference types="cypress" />

describe('', () => {
    it('Inclusão de produtos no cartrinho, inserindo resultados em uma planilha', () => {
        //comando personalizado em supports/commands
        cy.backgroundLogin();

        //Visitar a URL padrão http://automationpractice.com/
        cy.visit('/');

        //Validação da URL
        cy.url()
            .should('contain', '/index.php');

        //Setando variável com nome do produto
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

        /**----------------------------------------------------------------------------------- */

        // Declaração de constante com o caminho do arquivo CSV
        const pathCSV = 'cypress/fixtures/resultados.csv';
        //Nesta parte do projeto de teste, o cypress irá capturar os textos das telas com o invoke e inserir em uma planilha
        //Declarando variáveis 

        //matríz que permite inserir os valores recebidos
        let produtos = []
        //Variável prduto 1
        let produto1 = {
            nome: '',
            quantidade: 0,
            valorUnitario: 0,
            valorTotal: 0
        }

        cy.get('p[class="product-name"] a[href*="id_product=1&controller=product#/size-s/color-orange"]')
            //pegando as informações tipo texto
            .invoke('text').then(nomeProduto1 => {
                //produto recebe o valor de nomeProduto1
                produto1.nome = nomeProduto1
            })

        // - Valor unitário produto1
        cy.get('span[id="product_price_1_1_0"] [class="price"]')
            .invoke('text').then(valorUnitarioProduto1 => {
                //Transportmando o valor unitário em float e removendo o $
                produto1.valorUnitario = parseFloat(valorUnitarioProduto1.replace('$', ''))
                //Fazendo cálculo do valor total do produto 1
                produto1.valorTotal = produto1.quantidade * produto1.valorUnitario
            })

        // - Quantidade produto1
        cy.get('input[name="quantity_1_1_0_0"]')
            .invoke('val').then(quantidadeProduto1 => {
                //Transportmando o valor unitário em float
                produto1.quantidade = parseFloat(quantidadeProduto1)
                //Fazendo cálculo do valor total do produto 1
                produto1.valorTotal = produto1.quantidade * produto1.valorUnitario
            })
        //Adicionando os valores do produto1 na matriz produtos
        produtos.push(produto1)

        /**----------------------------------------------------------------------------------- */
        //Variável produto2
        let produto2 = {
            nome: '',
            quantidade: 0,
            valorUnitario: 0,
            valorTotal: 0
        }

        //Produto2
        cy.get('p[class="product-name"] a[href*="id_product=7&controller=product#/size-s/color-yellow"]')
            .invoke('text').then(nomeProduto2 => {
                produto2.nome = nomeProduto2
            })

        // - Valor unitário produto2
        cy.get('span[id="product_price_7_34_0"] [class="price special-price"]')
            .invoke('text').then(valorUnitarioProduto2 => {
                produto2.valorUnitario = parseFloat(valorUnitarioProduto2.replace('$', ''))
                //Calculando o valor total do produto 2
                produto2.valorTotal = produto2.quantidade * produto2.valorUnitario
            })

        // - Quantidade produto2
        cy.get('input[name="quantity_7_34_0_0"]')
            .invoke('val').then(quantidadeProduto2 => {
                produto2.quantidade = parseFloat(quantidadeProduto2)
                //Calculando o valor total do produto 2
                produto2.valorTotal = produto2.quantidade * produto2.valorUnitario
            })
        //Adicionando os valores do produto2 na matriz produtos
        produtos.push(produto2)

        /**----------------------------------------------------------------------------------- */
        //Variável produto3
        let produto3 = {
            nome: '',
            quantidade: 0,
            valorUnitario: 0,
            valorTotal: 0
        }


        //Produto3
        cy.get('p[class="product-name"] a[href*="id_product=2&controller=product#/size-s/color-black"]')
            .invoke('text').then(nomeProduto3 => {
                // o replace permite tratar a saída do valor
                produto3.nome = (nomeProduto3.replace('\n\t\t\t\t\t\t', '').replace('\n\t\t\t\t\tBlouse', ''))
            })

        // - Valor unitário produto3
        cy.get('span[id="product_price_2_7_0"] [class="price"]')
            .invoke('text').then(valorUnitarioProduto3 => {
                produto3.valorUnitario = parseFloat(valorUnitarioProduto3.replace('$', ''))
                //Calculando o valor total do produto 3
                produto3.valorTotal = produto3.quantidade * produto3.valorUnitario
            })

        // - Quantidade produto3
        cy.get('input[name="quantity_2_7_0_0"]')
            .invoke('val').then(quantidadeProduto3 => {
                produto3.quantidade = parseFloat(quantidadeProduto3)
                //Calculando o valor total do produto 3
                produto3.valorTotal = produto3.quantidade * produto3.valorUnitario
            })

        //Envio para a matriz o valor de produto3
        produtos.push(produto3)


        /**----------------------------------------------------------------------------------- */
        //Variável totalDosProdutos
        let totalDosProdutos = {
            somaTotalDosProdutos: 0
        }

        // totalDosProdutos
        cy.get('td[id="total_product"]')
            .invoke('text').then(valorTotalDosProdutos => {
                //cálculo da soma do dotal dos produtos
                totalDosProdutos.somaTotalDosProdutos = (produto1.valorTotal + produto2.valorTotal + produto3.valorTotal)
            })

        //Envio para a matriz o valor de totalDosProdutos
        produtos.push(totalDosProdutos);

        /**----------------------------------------------------------------------------------- */
        //Variável totalDoEnvio
        let totalDoEnvio = {
            valorDoEnvio: 0
        }

        // totalDoEnvio
        cy.get('td[id="total_shipping"]')
            .invoke('text').then(valorTotalDoEnvio => {

                //Atributo  valorDoEnvio recebendo o valor contido no invoke
                totalDoEnvio.valorDoEnvio = parseFloat(valorTotalDoEnvio.replace('$', ''))
            })

        //Envio para a matriz o valor de totalDoEnvio
        produtos.push(totalDoEnvio);

        /**----------------------------------------------------------------------------------- */
        //Variável totalDosImpostos
        let totalDosImpostos = {
            valorDoImposto: 0
        }

        // totalDosImpostos
        cy.get('td[id="total_tax"]')
            .invoke('text').then(valorTotalDosImpostos => {

                //Atributo  valorDoImposto recebendo o valor contido no invoke
                totalDosImpostos.valorDoImposto = parseFloat(valorTotalDosImpostos.replace('$', ''))
            })

        //Envio para a matriz o valor de totalDosImpostos
        produtos.push(totalDosImpostos);

        /**----------------------------------------------------------------------------------- */
        //Variável totalDaCompra
        let totalDaCompra = {
            valorDaCompra: 0
        }

        // totalDaCompra
        cy.get('span[id="total_price"]')
            .invoke('text').then(valorTotalDaCompra => {
                //Atributo  valorDaCompra recebendo o valor contido no invoke
                totalDaCompra.valorDaCompra = parseFloat(valorTotalDaCompra.replace('$', ''))
            })

        //Envio para a matriz o valor de totalDaCompra
        produtos.push(totalDaCompra);

        /**----------------------------------------------------------------------------------- */
        //Envio dos resultados para uma planilha 
        cy.writeFile(pathCSV, produtos)
    });
});