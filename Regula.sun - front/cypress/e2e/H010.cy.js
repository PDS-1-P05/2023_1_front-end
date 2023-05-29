import { config } from "../../config/config.js";
const ADMIN_EMAIL = config.ADMIN_EMAIL;
const ADMIN_SENHA = config.ADMIN_SENHA;

describe('Salvar os dados importados', () => {
    beforeEach(() => {
        cy.visit('https://localhost:5173/2023_1_front-end/')
        cy.get('a').contains('Admin').click()
        cy.url().should('include', '/login')

        cy.get('input').eq(0).type(ADMIN_EMAIL)
        cy.get('input').eq(1).type(ADMIN_SENHA)
        cy.get('button').click()
        cy.url().should('include', '/admin')
    })

    it('CT13 - Critério 3 - Planilha salva', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - PASSA.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - PASSA.csv')
                cy.get('span').should('contain', 'Indicador - PASSA.csv')
        })
        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('table').should('exist')

        cy.get('button').contains('Importar Dados').click()
        cy.wait(12000)
        cy.contains('div', 'sucesso').should('exist')
    })
})