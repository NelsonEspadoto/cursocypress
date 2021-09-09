/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.pause()

        cy.title()
            .debug()
            .should('be.eq', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should('be.eq', 'Campo de Treinamento')
            .and('contain', 'Campo')

        //TODO imprimir o log no console
        //TODO escrever o log em um campo de texto
    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
})