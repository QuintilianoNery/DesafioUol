Feature: Compra de produto
    Como um usuario desejo adicionar um produto ao carrinho
    Para que possa finalizar a compra do item

    Scenario: Inclusão de produto no carrinho com conclusão de pedido
        Given que acesso o site Automation Practice
        When selecionar o produto
        And incluir no carrinho
        And realizar o login
        Then devo concluir a compra do ítem
        And validar se a compra foi realizada com base na lista de histórico de compras
        And voltar para a página inicial do site