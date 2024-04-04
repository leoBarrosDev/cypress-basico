/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    // const partnerPhone = /^[0-9]+$/
    it('Verifica o título da aplicação', () => {
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche corretamente todos os campos do formulário', () => {
        cy.firstName()
        cy.lastName()
        cy.email()
        cy.phone()
        cy.product()
        cy.supportType()
        cy.checkbox()
        cy.textArea()
        cy.send()
        cy.success()
    })
    it('Preenchendo e-mail inválido', () => {
        cy.firstName()
        cy.lastName()
        cy.email()

        cy.get('#check > [for="email"]')
            .should('be.visible')

        cy.checkbox()
        cy.textArea()
        cy.send()
        cy.error()
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
        cy.firstName()
        cy.lastName()
        cy.email()
        cy.checkbox()
        cy.textArea()
        cy.send()
        cy.error()
    })

    it('Formulário não deve ser enviado sem os campos obrigatórios', () => {
        cy.phone()
        cy.product()
        cy.supportType()
        cy.send()
        cy.error()
    })

    it('Enviando formulário com arquivo anexado', () => {
        cy.firstName()
        cy.lastName()
        cy.email()
        cy.phone()
        cy.product()
        cy.supportType()
        cy.checkbox()
        cy.textArea()
        cy.fileAttach()
        cy.send()
        cy.success()
    })

    it('Testando link que abre em nova aba', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('Remove propriedade `target` antes de clicar', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
            .should('be.visible')
    })
})



