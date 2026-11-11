import { el } from '../support/helpers'

describe('Not found', () => {
	it('shows not-found for an unknown address', () => {
		cy.visit('/this-page-does-not-exist')
		cy.get(el('not-found')).should('be.visible')
		// Шапка на месте, приложение не сломалось
		cy.get(el('search-input')).should('exist')
	})

	it('shows not-found for an unknown term', () => {
		cy.visit('/terms/unknown-term')
		cy.get(el('not-found')).should('be.visible')
	})
})
