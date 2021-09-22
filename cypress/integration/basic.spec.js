/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        //cy.pause()

        cy.title()
            //.debug()
            .should('be.eq', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should('be.eq', 'Campo de Treinamento')
            .and('contain', 'Campo')

        let syncTitle

        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })
        
        cy.get('[data-cy=dataSobrenome]').then($elem => {
            $elem.val(syncTitle) //evitar usar o jquery quando estiver testando
        })

        cy.get('#elementosForm\\:sugestoes').then($elem => {
            cy.wrap($elem).type('Jeito Certo!')
        })
    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    });
})