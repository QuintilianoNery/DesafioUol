//passos para a implementação dos passos descritos na feature
/// <reference types="cypress" />


Given(/^que acesso o site Automation Practice$/, () => {
	//login com setCookie
	cy.backgroundLogin();

	//Acessar/Validar página inicial
	cy.visit('/');

	cy.url()
		.should('contain', '/index.php');

	cy.get('h1')
		.should('have.text', 'Automation Practice Website');
});

When(/^selecionar o produto$/, () => {

	//Seleção do produto
	//Pesquisar por nome do produto
	cy.get('input[id=search_query_top]')
		.type('Faded Short Sleeve');

	cy.get('button[name=submit_search]')
		.click();

	//Clicar no botão mais informações
	cy.get('a[class="button lnk_view btn btn-default"]')
		.click();

	//Verificar se o protudo da tela é o desejado
	cy.get('h1[itemprop=name]')
		.should('contain.text', 'Faded Short Sleeve');

});

When(/^incluir no carrinho$/, () => {

	//Validar se o botão add to cart existe
	cy.get('button[class="exclusive"]')
		.should('have.attr', 'type', 'submit')
		.should('have.attr', 'Name', 'Submit');

	//Verificar seleção de quantidade de produtos
	cy.get('a.product_quantity_up')
		.click()
		.click();

	cy.get('a.product_quantity_down')
		.click()
		.click();

	//Verificar seleção de cor do produto
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

	cy.get('span[id=layer_cart_product_title]')
		.should('contain.text', 'Faded Short Sleeve');

	//Verificar quantidade de produtos no carrinho 
	cy.get('span[id="layer_cart_product_quantity"]')
		.should('contain', '1')

	cy.get(".button-container a[href$='controller=order']")
		.click();
});

When(/^realizar o login$/, () => {
	//Página de informações dos produtos no cartrinho
	//Clicar no botão para continuar com o checkout
	cy.get(".cart_navigation a[href$='order&step=1']")
		.click();

	//Em um projeto real, Ingnora-se o arquivo cypress.env para evitar que seja enviada as credenciais para o repositório.
	//login com credenciais em variável de ambiente
	cy.get('#email')
		.type(Cypress.env('EMAIL-LOGIN'));

	cy.get('#passwd')
		.type(Cypress.env('S='));

	cy.get('button#SubmitLogin')
		.click();

	cy.get('input[id=addressesAreEquals]')
		.should('have.attr', 'checked', 'checked');
	cy.get('input[id=addressesAreEquals]')
		.should('have.attr', 'name', 'same');
});

Then(/^devo concluir a compra do ítem$/, () => {
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


	cy.get('div.box').invoke('text').then((text) => {
		console.log(text)

		//2. filtrar o texto do box, para extrair somente o ID do pedido com expressões regulares
		//filtrando tudo que começa é termina com letras de A a Z maiúscula, e informando que deseja somente a posição 2 que é o 1
		console.log(text.match(/[A-Z][A-Z]+/g)[1])

		//3. armazenar o ID do pedido de alguma forma
		//escrita de um  arquivo json com o ID do pedido
		//Três parâmetros, caminho do arquivo (sempre a partir do root )| conteúdo do arquivo
		cy.writeFile('cypress/fixtures/idPedido.json', { id: `${text.match(/[A-Z][A-Z]+/g)[1]}` })

	});

	//verificar a ultima tela
	cy.get('.cheque-indent strong')
		//pode-se usar o Expect ou o should - forma explícita e implícita
		.should('contain.text', 'Your order on My Store is complete.');

	//4. obter o id do pedido
	cy.get(".cart_navigation a[href$='history']").click();
});

Then(/^validar se a compra foi realizada com base na lista de histórico de compras$/, () => {
	//leitura de um arquivo com o ID do pedido
	cy.readFile('cypress/fixtures/idPedido.json').then((pedidos) => {

		//pegando o valor que foi informado no arquivo .json e validando com a tela de lista de pedidos na primeira linha
		//Com isso prova-se que o pedido foi realizado corretamente
		cy.get('tr.first_item .history_link a').should('contain.text', pedidos.id);
	});
});

Then(/^voltar para a página inicial do site$/, () => {
	//Clicar na logo e voltar para a página inicial
	cy.get('div[id=header_logo]')
		.click();

	//Validação da URL da página inicial
	cy.url()
		.should('contain', '/index.php')
		.should('eq', 'http://automationpractice.com/index.php');
});
