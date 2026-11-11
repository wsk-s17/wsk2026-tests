import { el, uid } from '../support/helpers'

describe('Notes', () => {
	beforeEach(() => {
		cy.loginAs()
	})

	it('creates a note and shows it in the list', () => {
		cy.visit('/notes')
		cy.number(el('notes-count')).then(before => {
			cy.createNote().then(note => {
				cy.get(el('alert-success')).should('be.visible')
				cy.contains(el('note-card'), note.title).should('exist')
				cy.number(el('notes-count')).should('eq', before + 1)
			})
		})
	})

	it('keeps line breaks in the text', () => {
		cy.createNote().then(note => {
			cy.contains(el('note-card'), note.title)
				.find(el('note-body'))
				.find('br')
				.should('exist')
		})
	})

	it('checks required fields on the server', () => {
		cy.visit('/notes/new')
		// Отключаем проверку браузера, чтобы проверить сервер
		cy.get(el('note-form-submit'))
			.closest('form')
			.invoke('attr', 'novalidate', 'novalidate')
		cy.get(el('note-form-body')).type('Text without title')
		cy.get(el('note-form-submit')).click()

		cy.location('pathname').should('eq', '/notes/new')
		cy.get(el('note-form-title-error')).should('be.visible').and('not.be.empty')
		cy.get(el('note-form-body')).should('have.value', 'Text without title')
	})

	it('rejects a title longer than 100 characters', () => {
		cy.visit('/notes/new')
		cy.get(el('note-form-title'))
			.invoke('removeAttr', 'maxlength')
			.type('a'.repeat(101), { delay: 0 })
		cy.get(el('note-form-submit')).click()

		cy.get(el('note-form-title-error')).should('be.visible')
	})

	it('deletes a note', () => {
		cy.createNote({ title: `Delete me ${uid()}` }).then(note => {
			cy.contains(el('note-card'), note.title).find(el('note-delete')).click()

			cy.get(el('alert-success')).should('be.visible')
			cy.contains(el('note-card'), note.title).should('not.exist')
		})
	})
})
