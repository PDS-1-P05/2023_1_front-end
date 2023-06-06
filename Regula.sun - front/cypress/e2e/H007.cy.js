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

    it('CT07 - Critério 1 - Formato incorreto', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/teste.pdf', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('teste.pdf')
                cy.get('span').should('contain', 'Insira')
        })

        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/teste.pdf', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('teste.pdf')
                cy.get('span').should('contain', 'Insira')
        })
    }),

    it('CT08 - Critério 2 - Importar Corretamente', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - PASSA.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - PASSA.csv')
                cy.get('span').should('contain', 'Indicador - PASSA.csv')
        })

        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - PASSA.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - PASSA.csv')
                cy.get('span').should('contain', 'Meta - PASSA.csv')
        })
    }),

    it('CT36 - Critério 3 - Nome de município incorreto', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Agua ClarO.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Agua ClarO.csv')
                cy.get('span').should('contain', 'Indicador - Agua ClarO.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Municipios a mais: Água ClarO')
    }),

    it('CT37 - Critério 4 - Posição dos municípios trocada', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Alcinopolis e Amambai trocados.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Alcinopolis e Amambai trocados.csv')
                cy.get('span').should('contain', 'Indicador - Alcinopolis e Amambai trocados.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Amambai,Alcinópolis')
    }),

    it('CT38 - Critério 5 - Municípios a menos', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Sem Alcinopolis e Amambai.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Sem Alcinopolis e Amambai.csv')
                cy.get('span').should('contain', 'Indicador - Sem Alcinopolis e Amambai.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Municipios faltantes: Alcinópolis,Amambai')
    }),

    it('CT39 - Critério 6 - Nome de um indicador incorreto', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - População UrbanO.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - População UrbanO.csv')
                cy.get('span').should('contain', 'Indicador - População UrbanO.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Indicadores a mais: População urbanO')
    }),

    it('CT40 - Critério 7 - Indicador faltando', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Sem Habitantes por domicílio e Renda per capita.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Sem Habitantes por domicílio e Renda per capita.csv')
                cy.get('span').should('contain', 'Indicador - Sem Habitantes por domicílio e Renda per capita.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Indicadores faltantes: Habitantes por domicílio,Renda per capita')
    }),
    
    it('CT41 - Critério 8 - Posição de indicadores trocada', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Reservação e Extensao de Rede trocados.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Reservação e Extensao de Rede trocados.csv')
                cy.get('span').should('contain', 'Indicador - Reservação e Extensao de Rede trocados.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Indicadores fora de ordem: Reservação,Extensão de rede')
    }),
    
    it('CT42 - Critério 9 - Nome de uma meta incorreto', () => {
        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - Agua ClarO.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - Agua ClarO.csv')
                cy.get('span').should('contain', 'Meta - Agua ClarO.csv')
        })

        cy.get('button').eq(3).click()
        cy.get('div').should('contain', 'Água Clar0')
    }),
    
    it('CT43 - Critério 10 - Meta faltando', () => {
        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - Sem Habitantes por domicílio e Renda per capita.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - Sem Habitantes por domicílio e Renda per capita.csv')
                cy.get('span').should('contain', 'Meta - Sem Habitantes por domicílio e Renda per capita.csv')
        })

        cy.get('button').eq(3).click()
        cy.get('div').should('contain', 'Indicadores faltantes: Habitantes por domicílio,Renda per capita')
    }),
    
    it('CT44 - Critério 11 - Posição de metas trocada', () => {
        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - Reservação e Extensao de Rede trocados.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - Reservação e Extensao de Rede trocados.csv')
                cy.get('span').should('contain', 'Meta - Reservação e Extensao de Rede trocados.csv')
        })

        cy.get('button').eq(3).click()
        cy.get('div').should('contain', 'Indicadores fora de ordem: Reservação,Extensão de rede')
    }),

    it('CT45 - Critério 12 - Ano faltando', () => {
        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - Sem Ano.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - Sem Ano.csv')
                cy.get('span').should('contain', 'Meta - Sem Ano.csv')
        })

        cy.get('button').eq(3).click()
        cy.get('div').should('contain', `Não existe a coluna 'Ano'`)
    }),

    it('CT48 - Cenário 13 - Campo vazio no arquivo de indicadores', () => {
        cy.get('input')
            .selectFile('cypress/fixtures/Indicador - Campo Vazio.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Indicador - Campo Vazio.csv')
                cy.get('span').should('contain', 'Indicador - Campo Vazio.csv')
        })

        cy.get('button').contains('Pré-Visualizar').click()
        cy.get('div').should('contain', 'Valor vazio encontrado na COLUNA: Corguinho, INDICADOR: Número de reclamações registrados na Ouvidoria da AGEMS')
    }),

    it('CT49 - Cenário 14 - Campo vazio no arquivo de metas', () => {
        cy.get('button').contains('Metas').click()
        cy.get('input').eq(1)
            .selectFile('cypress/fixtures/Meta - Campo Vazio.csv', {force: true})
            .then(input => {
                expect(input[0].files[0].name).to.eq('Meta - Campo Vazio.csv')
                cy.get('span').should('contain', 'Meta - Campo Vazio.csv')
        })

        cy.get('button').eq(3).click()
        cy.get('div').should('contain', 'Valor vazio encontrado na COLUNA: Maracaju, INDICADOR: Reservação (em m³)')
    });
});