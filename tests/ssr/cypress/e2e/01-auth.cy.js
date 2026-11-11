import { DEMO, el } from '../support/helpers'

describe('Login and logout', () => {
	it('logs in with valid credentials', () => {
		cy.visit('/login')
		cy.get(el('login-email')).type(DEMO.email)
		cy.get(el('login-password')).type(DEMO.password)
		cy.get(el('login-submit')).click()

		cy.location('pathname').should('eq', '/notes')
		cy.get(el('nav-logout')).should('exist')
	})

	it('shows an error for a wrong password and keeps the email', () => {
		cy.visit('/login')
		cy.get(el('login-email')).type(DEMO.email)
		cy.get(el('login-password')).type('wrong-password')
		cy.get(el('login-submit')).click()

		cy.location('pathname').should('eq', '/login')
		cy.get(el('login-email-error')).should('be.visible').and('not.be.empty')
		cy.get(el('login-email')).should('have.value', DEMO.email)
		cy.get(el('login-password')).should('have.value', '')
	})

	it('redirects a guest to the login page', () => {
		cy.visit('/notes')
		cy.location('pathname').should('eq', '/login')
	})

	it('logs out', () => {
		cy.loginAs()
		cy.visit('/notes')
		cy.get(el('nav-logout')).click()

		cy.location('pathname').should('eq', '/login')
		cy.get(el('nav-logout')).should('not.exist')
	})
})
