/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    const partnerPhone = /^[0-9]+$/
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

        cy.get('#check > [for="email"]')
            .should('be.visible')

        cy.get('#email-checkbox')
            .should('be.visible')
            .click()
            .should('be.checked');

        cy.get('#open-text-area')
            .should('be.visible')
            .clear()
            .type('Mensagem de teste', { delay: 0 });

        cy.get('.button[type="submit"]')
            .should('be.visible')
            .should('be.enabled')
            .and('contain', 'Enviar')
            .click()
        cy.get('span.error')
            .should('exist')
            .and('contain', 'Valide os campos obrigatórios!');
    })

    it('Campo teledone aceita apenas números', () => {
        cy.get('#phone')
            .should('be.visible')
            .clear()
            .type('abc')
            .should('have.value', '')
        // .invoke('val')
        // .should('match', partnerPhone)
        // .then(phoneValue => {
        //     if (partnerPhone.test(phoneValue)) {
        //         throw new Error('O valor do telefone contém caracteres não numéricos');
        //     }
        // });       
    })

    it('Campo telefone se torna obrigatório quando a opção de mesmo nome for selecionada', () => {
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

        cy.get('#phone-checkbox')
            .should('be.visible')
            .click()
            .should('be.checked')

        cy.get('#open-text-area')
            .should('be.visible')
            .clear()
            .type('Mensagem de teste', { delay: 0 })

        cy.get('.button[type="submit"]')
            .should('be.visible')
            .should('be.enabled')
            .and('contain', 'Enviar')
            .click()

        cy.get('span.error')
            .should('exist')
            .and('contain', 'Valide os campos obrigatórios!');
    })

    it.only('Formulário não deve ser enviado sem os campos obrigatórios', () => {
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
                cy.wrap(radioButtons)
                    .eq(1)
                    .check()
                    .should('be.checked');
            })

        cy.get('.button[type="submit"]')
            .should('be.visible')
            .should('be.enabled')
            .and('contain', 'Enviar')
            .click()

        cy.get('span.error')
            .should('exist')
            .and('contain', 'Valide os campos obrigatórios!');
    })
})



