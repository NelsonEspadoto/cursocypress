/// <reference types="cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })
    
    beforeEach(() => {
        buildEnv()
        cy.login('a@a', 'senha')
        cy.get(loc.MENU.HOME).click()
    })


    it('Should create an account', () => {
        cy.route({
            url: '/contas',
            method: 'POST',
            response: {
                id: 3,
                nome: "Conta de teste",
                visivel: true,
                usuario_id: 1
            } 
        }).as('contas')

        cy.acessarMenuConta()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: "Conta de teste", visivel: true, usuario_id: 1 }
            ] 
        }).as('contas salvas')

        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    });

    it('Should update an account', () => {
        cy.route({
            url: '/contas/**',
            method: 'PUT',
            response: {
                id: 1,
                nome: "Conta alterada",
                visivel: true,
                usuario_id: 1
            } 
        })

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
            cy.get(loc.CONTAS.BTN_SALVAR).click()
            cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')    
    });

    it('Should not create an account with same name', () => {
        cy.route({
            url: '/contas',
            method: 'POST',
            response: { "error": "Já existe uma conta com esse nome!" },
            status: 400
        }).as('saveAccountSameName')
        
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    });

    it.only('Should create a transaction', () => {
        cy.route({
            method: "POST",
            url: "/transacoes",
            response: { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 }
        })
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Interessado')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.VALOR).type('423')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Descrição', '423')).should('exist')
    });

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('have.text', 'Conta para saldo')
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA_VALOR('Conta para saldo')).should('contain', '534,00')
    });

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao', '1.500,00')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso!')
    });
})