import { el, terms } from '../support/helpers'

describe('Favorites', () => {
	it('adds and removes a term', () => {
		cy.openTerm(0)
		cy.get(el('favorites-count')).should('have.text', '0')
		cy.get(el('favorite-toggle')).should('have.attr', 'aria-pressed', 'false')

		cy.get(el('favorite-toggle')).click()
		cy.get(el('favorite-toggle')).should('have.attr', 'aria-pressed', 'true')
		cy.get(el('favorites-count')).should('have.text', '1')

		cy.get(el('favorite-toggle')).click()
		cy.get(el('favorite-toggle')).should('have.attr', 'aria-pressed', 'false')
		cy.get(el('favorites-count')).should('have.text', '0')
	})

	it('shows favorites on their page', () => {
		cy.openTerm(0)
		cy.get(el('favorite-toggle')).click()
		cy.openTerm(3)
		cy.get(el('favorite-toggle')).click()

		cy.get(el('nav-favorites')).click()
		cy.get(el('favorite-item')).should('have.length', 2)
		cy.contains(el('favorite-item'), terms[0].term).should('exist')
		cy.contains(el('favorite-item'), terms[3].term).should('exist')
	})

	it('keeps favorites after reload', () => {
		cy.openTerm(1)
		cy.get(el('favorite-toggle')).click()
		cy.get(el('favorites-count')).should('have.text', '1')

		cy.reload()
		cy.get(el('favorites-count')).should('have.text', '1')
		cy.get(el('favorite-toggle')).should('have.attr', 'aria-pressed', 'true')
	})

	it('shows an empty state', () => {
		cy.openList()
		cy.get(el('nav-favorites')).click()
		cy.get(el('favorites-empty')).should('be.visible')
	})
})
