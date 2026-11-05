import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { searchStories } from '../api/stories.js'
import StoryCard from '../components/story-card.jsx'

export default function SearchStoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const term = (searchParams.get('q') ?? '').trim()

  const [formError, setFormError] = useState('')

  const [query, setQuery] = useState({
    term: null,
    status: 'idle',
    stories: [],
    error: '',
  })

  useEffect(() => {
    if (!term) return

    const controller = new AbortController()

    async function loadStories() {
      setQuery({
        term,
        status: 'loading',
        stories: [],
        error: '',
      })

      try {
        const stories = await searchStories(term, {
          signal: controller.signal,
        })

        if (controller.signal.aborted) return

        setQuery({
          term,
          status: 'success',
          stories,
          error: '',
        })
      } catch (error) {
        if (controller.signal.aborted) return

        setQuery({
          term,
          status: 'error',
          stories: [],
          error:
            error instanceof TypeError
              ? 'Não foi possível conectar ao servidor.'
              : error.message || 'Não foi possível buscar histórias.',
        })
      }
    }

    loadStories()

    return () => controller.abort()
  }, [term])

  function handleSearch(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nextTerm = String(formData.get('q') ?? '').trim()

    if (!nextTerm) {
      setFormError('Digite um termo para buscar.')
      return
    }

    setFormError('')
    setSearchParams({ q: nextTerm })
  }

  const isLoading =
    Boolean(term) &&
    (query.term !== term || query.status === 'loading')

  return (
    <section>
      <h1>Buscar histórias</h1>

      <form key={term} onSubmit={handleSearch}>
        <label htmlFor="search-term">Título ou tag</label>

        <input
          id="search-term"
          name="q"
          type="search"
          defaultValue={term}
          placeholder="Ex.: liderança"
          onChange={() => setFormError('')}
          aria-invalid={Boolean(formError)}
          aria-describedby={formError ? 'search-error' : undefined}
          required
        />

        {formError && (
          <p id="search-error" role="alert">
            {formError}
          </p>
        )}

        <button type="submit">Buscar</button>
      </form>

      <div className="search-results" aria-busy={isLoading}>
        {!term ? (
          <p>Digite um termo para buscar histórias.</p>
        ) : isLoading ? (
          <p role="status">Buscando histórias...</p>
        ) : query.status === 'error' ? (
          <p role="alert">{query.error}</p>
        ) : query.status === 'success' ? (
          <>
            <p role="status">
              {query.stories.length === 0
                ? `Nenhuma história encontrada para “${term}”.`
                : `${query.stories.length} resultado(s) para “${term}”.`}
            </p>

            {query.stories.length > 0 && (
              <ul className="story-grid">
                {query.stories.map((story) => (
                  <li key={story.id}>
                    <StoryCard story={story} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>

      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  )
}