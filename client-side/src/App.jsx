import { useEffect, useState } from 'react'
import {
	BrowserRouter,
	Link,
	Route,
	Routes,
	useNavigate,
	useParams,
	useSearchParams
} from 'react-router-dom'
import data from './data.json'

const STORAGE_KEY = 'favorites'

function loadFavorites() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
	} catch {
		return []
	}
}

function findTerm(id) {
	return data.terms.find(term => term.id === id)
}

function Header({ favoritesCount }) {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')

	function submit(event) {
		event.preventDefault()
		navigate(`/search?q=${encodeURIComponent(query.trim())}`)
	}

	return (
		<header className="header">
			<Link
				to="/"
				data-cy="nav-home"
			>
				Glossary
			</Link>
			<form
				onSubmit={submit}
				role="search"
			>
				<input
					type="search"
					placeholder="Search"
					aria-label="Search"
					value={query}
					onChange={event => setQuery(event.target.value)}
					data-cy="search-input"
				/>
			</form>
			<Link
				to="/favorites"
				data-cy="nav-favorites"
			>
				Favorites (<span data-cy="favorites-count">{favoritesCount}</span>)
			</Link>
		</header>
	)
}

function TermCard({ term }) {
	return (
		<article
			className="card"
			data-cy="term-card"
		>
			<h2 data-cy="term-name">{term.term}</h2>
			<p data-cy="term-category">{term.category}</p>
			<Link
				to={`/terms/${term.id}`}
				data-cy="term-open"
			>
				Open
			</Link>
		</article>
	)
}

function TermList() {
	return (
		<main>
			<h1>All terms</h1>
			{data.terms.map(term => (
				<TermCard
					key={term.id}
					term={term}
				/>
			))}
		</main>
	)
}

function TermPage({ favorites, toggleFavorite }) {
	const { id } = useParams()
	const term = findTerm(id)

	if (!term) return <NotFound />

	const isFavorite = favorites.includes(term.id)

	return (
		<main>
			<h1 data-cy="term-title">{term.term}</h1>
			<p data-cy="term-definition">{term.definition}</p>
			<button
				type="button"
				aria-pressed={isFavorite}
				onClick={() => toggleFavorite(term.id)}
				data-cy="favorite-toggle"
			>
				{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</button>
		</main>
	)
}

function Highlight({ text, query }) {
	const index = text.toLowerCase().indexOf(query.toLowerCase())
	if (!query || index === -1) return text

	return (
		<>
			{text.slice(0, index)}
			<mark>{text.slice(index, index + query.length)}</mark>
			{text.slice(index + query.length)}
		</>
	)
}

function SearchPage() {
	const [params] = useSearchParams()
	const query = (params.get('q') || '').trim()
	const text = query.toLowerCase()
	const results = text
		? data.terms.filter(
				term =>
					term.term.toLowerCase().includes(text) ||
					term.definition.toLowerCase().includes(text)
			)
		: []

	return (
		<main>
			<h1>Search: {query}</h1>
			{results.length === 0 && <p data-cy="search-empty">Nothing found.</p>}
			{results.map(term => (
				<article
					className="card"
					key={term.id}
					data-cy="search-result"
				>
					<h2>
						<Link to={`/terms/${term.id}`}>{term.term}</Link>
					</h2>
					<p data-cy="search-result-excerpt">
						<Highlight
							text={term.definition}
							query={query}
						/>
					</p>
				</article>
			))}
		</main>
	)
}

function FavoritesPage({ favorites }) {
	const terms = favorites.map(findTerm).filter(Boolean)

	return (
		<main>
			<h1>Favorites</h1>
			{terms.length === 0 && <p data-cy="favorites-empty">No favorites yet.</p>}
			<ul>
				{terms.map(term => (
					<li
						key={term.id}
						data-cy="favorite-item"
					>
						<Link to={`/terms/${term.id}`}>{term.term}</Link>
					</li>
				))}
			</ul>
		</main>
	)
}

function NotFound() {
	return (
		<main data-cy="not-found">
			<h1>Page not found</h1>
			<Link to="/">Back to all terms</Link>
		</main>
	)
}

export default function App() {
	const [favorites, setFavorites] = useState(loadFavorites)

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
	}, [favorites])

	function toggleFavorite(id) {
		setFavorites(list =>
			list.includes(id) ? list.filter(item => item !== id) : [...list, id]
		)
	}

	return (
		<BrowserRouter>
			<Header favoritesCount={favorites.length} />
			<Routes>
				<Route
					path="/"
					element={<TermList />}
				/>
				<Route
					path="/terms/:id"
					element={
						<TermPage
							favorites={favorites}
							toggleFavorite={toggleFavorite}
						/>
					}
				/>
				<Route
					path="/search"
					element={<SearchPage />}
				/>
				<Route
					path="/favorites"
					element={<FavoritesPage favorites={favorites} />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
