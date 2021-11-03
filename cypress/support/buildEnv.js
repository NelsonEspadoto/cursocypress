const buildEnv = () => {
    cy.server()

    cy.route({
        url: '/signin',
        method: 'POST',
        response: {
            id: 1000,
            nome: "Usuário Inválido",
            token: "String inválida"
        }
    }).as('signin')
    
    cy.route({
        url: '/saldo',
        method: 'GET',
        response: [
            { conta_id: 999, conta: "Carteira", saldo: "100.00" },
            { conta_id: 9909, conta: "Banco", saldo: "1000.00" }
        ]
    }).as('saldo')

    cy.route({
        url: '/contas',
        method: 'GET',
        response: [
            { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
            { id: 2, nome: "Banco", visivel: true, usuario_id: 1 }
        ] 
    }).as('contas')

    cy.route({
        url: '/extrato/**',
        method: 'GET',
        response: [{ id: 1, nome: "Carteira", visivel: true, usuario_id: 1 }] 
    })
}

export default buildEnv