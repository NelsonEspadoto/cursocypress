/// <reference types="cypress" />

const { expect } = require("chai");

describe('Helpers...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Wrap', () => {
        const obj = { nome: 'User', idade: 35 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.get("#formNome").then($elem => {
            // $elem.val('funciona via jquery')
            cy.wrap($elem).type('Funciona!')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log("Encontrei o segundo botão"))

        cy.wrap(1).should(num => {
            return 2
        }).should('be.eq', 1)

        cy.wrap(1).then(num => {
            return 2
        }).should('be.eq', 2)
    })

    it('Its...', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: "Dos Bobos" }}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'Bobos')

        cy.title().its('length').should('be.eq', 20)
    })

    it('Invoke...', () => {
        const getValue = () => 1;
        const sum = (a, b) => a + b
        cy.wrap({ func: getValue }).invoke('func').should('be.eq', 1)
        cy.wrap({ func: sum }).invoke('func', 2, 5).should('be.eq', 7)

        cy.get('#formNome').invoke('val', "texto via invoke")
        cy.window().invoke('alert', 'Da pra ver?')

        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!"/>')
    });
})