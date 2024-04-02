/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', () => {
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche corretamente todos os campos do formulário', () => {
        cy.get('#firstName')
            .should('be.visible')
            .clear()
            .type('Leandro')

        cy.get('#lastName')
            .should('be.visible')
            .clear()
            .type('Reis')

        cy.get('#email')
            .should('be.visible')
            .clear()
            .type('leohbr@gmail.com')

        cy.get('#phone')
            .should('be.visible')
            .clear()
            .type('11999999999')

        cy.get('#product')
            .should('be.visible')
            .select('Mentoria')

        cy.get('#support-type')
            .find('input[type="radio"]')
            .then(radioButtons => {
                // cy.wrap(radioButtons)
                //     .first() 
                //     .check() 
                //     .should('be.checked'); 

                cy.wrap(radioButtons)
                    .eq(1)
                    .check()
                    .should('be.checked');

                // cy.wrap(radioButtons)
                //     .last() 
                //     .check() 
                //     .should('be.checked'); 

            });
        cy.get('#check')
            .find('input[type="checkbox"]')
            .each(checkbox => {
                cy.wrap(checkbox).check().should('be.checked');
            });

        cy.get('#open-text-area')
            .should('be.visible')
            .type('Mensagem de teste');

        cy.get('.button').then(buttons => {
            buttons.each((button) => {
                if (button.textContent === 'Enviar' && button.type === 'submit') {
                    cy.wrap(button).click();
                }
            });
        });
    })



    it('', () => {

    })
})