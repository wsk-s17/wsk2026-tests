import './commands'

// Каждый тест начинается без избранного
beforeEach(() => {
	cy.clearLocalStorage()
})
