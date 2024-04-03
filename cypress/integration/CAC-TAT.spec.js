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
            .clear()
            .type('Essa mensagem será digitada instantaneamente, delay com o valor igual a 70.', { delay: 0 });

        cy.get('.button[type="submit"]')
            .should('be.visible')
            .should('be.enabled')
            .and('contain', 'Enviar')
            .click()
        cy.get('span.success')
            .should('exist')
            .and('contain', 'Mensagem enviada com sucesso.');
    })

    it('Preenchendo e-mail inválido', () => {
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
            .type('leohbr@gmail')

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
            .clear()
            .type('Essa mensagem será digitada instantaneamente, delay com o valor igual a 70.', { delay: 0 });

        cy.get('.button[type="submit"]')
            .should('be.visible')
            .should('be.enabled')
            .and('contain', 'Enviar')
            .click()
        cy.get('span.error')
            .should('exist')
            .and('contain', 'Valide os campos obrigatórios!');
    })

});