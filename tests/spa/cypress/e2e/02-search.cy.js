import { el, findTerms } from '../support/helpers'

describe('Search', () => {
	it('finds terms by name and definition', () => {
		const word = 'browser'
		const expected = findTerms(word)

		cy.openList()
		cy.search(word)

		cy.get(el('search-result')).should('have.length', expected.length)
		expected.forEach(term => {
			cy.contains(el('search-result'), term.term).should('exist')
		})
	})

	it('is case-insensitive and highlights the found text', () => {
		cy.openList()
		cy.search('HTTP')

		cy.get(el('search-result')).should('have.length', findTerms('http').length)
		cy.get(el('search-result-excerpt'))
			.find('mark')
			.first()
			.invoke('text')
			.should('match', /^http$/i)
	})

	it('shows a message when nothing is found', () => {
		cy.openList()
		cy.search('zzzz')

		cy.get(el('search-result')).should('not.exist')
		cy.get(el('search-empty')).should('be.visible')
	})
})
