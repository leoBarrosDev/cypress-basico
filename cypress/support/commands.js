/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

const longText = Cypress._.repeat(faker.lorem.paragraph(), 3)

const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number()
}

Cypress.Commands.add('firstName', () => {
    cy.get('#firstName')
        .should('be.visible')
        .clear()
        .type(user.firstName)
})

Cypress.Commands.add('lastName', () => {
    cy.get('#lastName')
        .should('be.visible')
        .clear()
        .type(user.lastName)
})

Cypress.Commands.add('email', () => {
    cy.get('#email')
        .should('be.visible')
        .clear()
        .type(user.email)
})

Cypress.Commands.add('phone', () => {
    cy.get('#phone')
        .should('be.visible')
        .clear()
        .type(user.phone)
})

Cypress.Commands.add('product', () => {
    cy.get('#product')
        .should('be.visible')
        .select('Mentoria')
})

Cypress.Commands.add('supportType', () => {
    cy.get('#support-type')
        .find('input[type="radio"]')
        .then(radioButtons => {
            cy.wrap(radioButtons)
                .eq(1)
                .check()
                .should('be.checked');
        })
})

Cypress.Commands.add('checkbox', () => {
    cy.get('#check')
        .find('input[type="checkbox"]')
        .each(checkbox => {
            cy.wrap(checkbox).check().should('be.checked');
        });
})

Cypress.Commands.add('textArea', () => {
    cy.get('#open-text-area')
        .should('be.visible')
        .clear()
        .invoke('val', longText)
        .should('have.value', longText)
})

Cypress.Commands.add('send', () => {
    // cy.contains('button', 'Enviar')
    cy.get('.button[type="submit"]')
        .should('be.visible')
        .should('be.enabled')
        .and('contain', 'Enviar')
        .click()
})

Cypress.Commands.add('success', () => {
    cy.get('span.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
})

Cypress.Commands.add('error', () => {
    cy.get('span.error')
        .should('exist')
        .and('contain', 'Valide os campos obrigatórios!');
})

Cypress.Commands.add('fileAttach', () => {
    cy.fixture('example.json').as('jsonFile')
    cy.get('input[type="file"]')
        .should('be.visible')
        .should('not.have.value')
        .selectFile('@jsonFile', { action: 'drag-drop' })
        .should(($element) => {
            expect($element[0].files[0].name).to.eq('example.json')
        })
})