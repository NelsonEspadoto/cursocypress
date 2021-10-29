/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => {
        //     expect(msg).to.be.eq('Alert Simples')
        // })

        cy.clickAlert('#alert', 'Alert Simples')
    });

    it('Alert com Mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    });

    it('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Confirmado')
        })

        cy.get('#confirm').click()
    });

    it('Deny', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Confirm Simples')
            return false //return false para clicar em cancelar
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.eq('Negado')
        })

        cy.get('#confirm').click()
    });

    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(10)
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.eq('Era 10?')
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.eq(':D')
        })

        cy.get('#prompt').click()
    });

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Nelson')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Espadoto')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})