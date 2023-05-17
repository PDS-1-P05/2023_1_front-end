import { config } from "../../config/config.js";
const ADMIN_EMAIL = config.ADMIN_EMAIL;
const ADMIN_SENHA = config.ADMIN_SENHA;

describe('Logar no sistema', () => {
  beforeEach(() => {
    cy.visit('https://localhost:5173/2023_1_front-end/')
    cy.get('a').contains('Admin').click()
    cy.url().should('include', '/login')
  })

  it('CT01 e CT02 - Critério 1 - Informações inválidas', () => {
    cy.get('input').eq(0).type('teste@email.com')
    cy.get('input').eq(1).type('12345678')
    cy.get('button').click()
    cy.url().should('include', '/login')
    cy.get('.alerta').should('contain' ,'Usuário/Senha inválido!')
  }),

  it('CT03 - Critério 2 - Dados vazios', () => {
    
    cy.get('button').click()
    cy.get('div').should('contain' ,'Insira')
  }),

  it('CT04 - Critério 3 - Dados incompletos', () => {
    cy.get('button').click()
    cy.get('div').should('contain' ,'Insira')

    cy.get('input').eq(0).type('teste@email.com')
    cy.get('button').click()
    cy.get('div').should('contain' ,'Insira')
    cy.get('input').eq(0).clear()

    cy.get('input').eq(1).type('12345678')
    cy.get('button').click()
    cy.get('div').should('contain' ,'Insira')
  }),

  // it('Critério 4 - Usuário esqueceu a senha', () => {
  //   cy.visit('https://pds-1-p05.github.io/2023_1_front-end/')

  //   // TODO
  // })

  it('CT06 - Critério 5 - Dados completados', () => {

    cy.get('input').eq(0).type(ADMIN_EMAIL)
    cy.get('input').eq(1).type(ADMIN_SENHA)
    cy.get('button').click()
    cy.url().should('include', '/admin')
  })
})