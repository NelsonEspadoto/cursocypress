/// <reference types="cypress" />

describe('Work with locators', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3)')
        cy.get('[onclick*=\'Francisco\']')
        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3)')
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input')
    });

    it('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]')
    });
})