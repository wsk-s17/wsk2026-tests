import { DEMO, el, newNote } from './helpers'

// Вход через UI, сессия кэшируется по email
Cypress.Commands.add('loginAs', (user = DEMO) => {
	cy.session(
		user.email,
		() => {
			cy.visit('/login')
			cy.get(el('login-email')).type(user.email)
			cy.get(el('login-password')).type(user.password)
			cy.get(el('login-submit')).click()
			cy.get(el('nav-logout')).should('exist')
		},
		{
			// Если сессию закрыли (например, тест выхода), войти заново
			validate() {
				cy.request({ url: '/notes', followRedirect: false })
					.its('status')
					.should('eq', 200)
			}
		}
	)
})

// Создание заметки через форму, возвращает её данные
Cypress.Commands.add('createNote', (overrides = {}) => {
	const note = newNote(overrides)

	cy.visit('/notes/new')
	cy.get(el('note-form-title')).type(note.title)
	cy.get(el('note-form-body')).type(note.body)
	cy.get(el('note-form-submit')).click()
	cy.location('pathname').should('eq', '/notes')

	return cy.wrap(note)
})

// Число из текста элемента
Cypress.Commands.add('number', selector => {
	return cy
		.get(selector)
		.first()
		.invoke('text')
		.then(text => parseInt(text.replace(/[^0-9]/g, ''), 10))
})
