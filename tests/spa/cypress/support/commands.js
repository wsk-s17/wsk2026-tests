import { el, terms } from './helpers'

// Список загружен
Cypress.Commands.add('openList', () => {
	cy.visit('/')
	cy.get(el('term-card')).should('have.length', terms.length)
})

// Открыть термин через интерфейс по номеру в списке (с 0)
Cypress.Commands.add('openTerm', index => {
	cy.openList()
	cy.get(el('term-card')).eq(index).find(el('term-open')).click()
	cy.get(el('term-title')).should('have.text', terms[index].term)
})

// Поиск из шапки с отправкой по Enter
Cypress.Commands.add('search', word => {
	cy.get(el('search-input')).clear().type(`${word}{enter}`)
})
