import { config } from "../../config/config.js";
const ADMIN_EMAIL = config.ADMIN_EMAIL;
const ADMIN_SENHA = config.ADMIN_SENHA;

describe('Importar dados em formato csv', () => {
    beforeEach(() => {
        cy.visit('https://localhost:5173/2023_1_front-end/')
        cy.get('a').contains('Admin').click()
        cy.url().should('include', '/login')

        cy.get('input').eq(0).type(ADMIN_EMAIL)
        cy.get('input').eq(1).type(ADMIN_SENHA)
        cy.get('button').click()
        cy.url().should('include', '/admin')
    })

    // it('CT07 - Critério 1 - Formato incorreto', () => {
    //     cy.get('input')
    //         .selectFile('cypress/fixtures/teste.pdf', {force: true})
    //         .then(input => {
    //             expect(input[0].files[0].name).to.eq('teste.pdf')
    //             cy.get('span').should('contain', 'Insira')
    //     })
        
    // }),

    it('CT08 - Critério 2 - Importar Corretamente', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - PASSA.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - PASSA.csv')
                cy.get('span').should('contain', 'Indicador - PASSA.csv')
        })
        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('button').contains('Importar Dados').wait(1000).click()
        cy.wait(12000)
        cy.get('div').should('contain', 'sucesso')
    });
});