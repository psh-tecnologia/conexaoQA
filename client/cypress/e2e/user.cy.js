import { register, login } from '../../src/actions/auth'
import { createProfile } from '../../src/actions/profile'

describe("Cadastro de Usuario", () => {

  let name = 'Carlost'
  let email = 'carlost@teste.com'
  let password = '123456'

  beforeEach(() => {
    cy.visit('/')
    cy.wait(5000)
    // chama App Action de registro / criação do usuário
    cy.window()
      .its('store')
      .invoke('dispatch', register({ name: name, email: email, password: password }))

    cy.wait(5000)
    // chama App Action de criar perfil
    cy.window()
      .its('store')
      .invoke('dispatch', createProfile({ status: 'QA Júnior', skills: 'Cypress, Selenium' }))
    cy.wait(5000)
  }) // termina beforeEach

  afterEach(() => {
    // vai para a página de dashboard
    cy.get('[data-test="navbar-dashboard"]')
      .click()

    // excluir perfil
    cy.get('[data-test="dashboard-deleteProfile"]')
      .click()

  }) // termina afterEach

  it('valida cadastro com sucesso', () => {

    cy.get('[data-test="dashboard-welcome"]')
      .should('contain.text', name)

  }) // termina teste valida cadastro com sucesso

  it('valida login com sucesso', () => {

    cy.get('[data-test="navbar-logout"]')
      .click()

    // chama App Action de Login
    cy.window()
      .its('store')
      .invoke('dispatch', login(email, password))

    cy.url().should('eq', 'http://localhost:3000/dashboard')

    cy.get('[data-test="dashboard-welcome"]')
    .should('contain.text', name)

  }) // termina teste valida login com sucesso

}) // termina describe