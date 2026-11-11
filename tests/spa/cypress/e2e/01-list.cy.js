import { el, terms } from '../support/helpers'

describe('Term list', () => {
	it('shows all terms from data.json in order', () => {
		cy.openList()

		terms.forEach((term, index) => {
			cy.get(el('term-card'))
				.eq(index)
				.find(el('term-name'))
				.should('have.text', term.term)
			cy.get(el('term-card'))
				.eq(index)
				.find(el('term-category'))
				.should('have.text', term.category)
		})
	})

	it('opens a term without page reload', () => {
		cy.openList()
		cy.window().then(win => {
			win.__spa = true
		})

		cy.get(el('term-card')).eq(1).find(el('term-open')).click()

		cy.location('pathname').should('contain', terms[1].id)
		cy.get(el('term-title')).should('have.text', terms[1].term)
		cy.get(el('term-definition')).should('have.text', terms[1].definition)
		// Флаг остался: страница не перезагружалась
		cy.window().its('__spa').should('eq', true)
	})

	it('opens a term by direct link', () => {
		cy.openTerm(2)
		cy.location('pathname').then(pathname => {
			cy.visit(pathname)
			cy.get(el('term-title')).should('have.text', terms[2].term)
		})
	})
})
