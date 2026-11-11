import data from '../fixtures/data.json'

export const { terms } = data

export const el = name => `[data-cy="${name}"]`

// Термины, где слово есть в названии или определении
export function findTerms(word) {
	const text = word.toLowerCase()
	return terms.filter(
		term =>
			term.term.toLowerCase().includes(text) ||
			term.definition.toLowerCase().includes(text)
	)
}
