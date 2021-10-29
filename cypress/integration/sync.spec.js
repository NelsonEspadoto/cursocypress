/// <reference types="cypress" />

describe('Waiting...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento disponível.', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    });
    
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            // .should('not.exist') não pode encadear no mesmo get.
            .should('exist')
            .type('funciona')
    });

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });

    it('Uso do Timeout', () => {
        cy.get('#buttonListDOM').click()
        //cy.wait(3000)
        cy.get('#lista li span', { timeout: 6000 })
            .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    });

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    });

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').should($elem => {
            expect($elem).to.have.length(1)
        }).and('have.id', 'buttonListDOM')
        cy.get('#buttonListDOM').then($elem => {
            expect($elem).to.have.length(1)
            return 2
        }).and('be.eq', 2)
    });
})