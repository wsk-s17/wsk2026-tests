// Пользователь из сидера
export const DEMO = { email: 'demo@test.wsk', password: 'demopass' }

export const el = name => `[data-cy="${name}"]`

let counter = 0

// Уникальный суффикс, чтобы тесты не зависели от данных в базе
export function uid() {
	counter += 1
	return `${Date.now().toString(36)}${counter}${Math.random().toString(36).slice(2, 6)}`
}

export function newNote(overrides = {}) {
	return {
		title: `Note ${uid()}`,
		body: 'First line.\nSecond line.',
		...overrides
	}
}
