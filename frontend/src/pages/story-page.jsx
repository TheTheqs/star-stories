import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { ApiError, getStory } from '../api/stories.js'

export default function StoryPage() {
  const { id } = useParams()

  const [query, setQuery] = useState({
    id: null,
    status: 'loading',
    story: null,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadStory() {
      setQuery({
        id,
        status: 'loading',
        story: null,
        error: '',
      })

      try {
        const story = await getStory(id, {
          signal: controller.signal,
        })

        if (controller.signal.aborted) return

        setQuery({
          id,
          status: 'success',
          story,
          error: '',
        })
      } catch (error) {
        if (controller.signal.aborted) return

        const notFound =
          error instanceof ApiError && error.status === 404

        setQuery({
          id,
          status: notFound ? 'not-found' : 'error',
          story: null,
          error: notFound
            ? 'Não encontramos uma história com esse ID.'
            : 'Não foi possível carregar a história. Tente novamente mais tarde.',
        })
      }
    }

    loadStory()

    return () => {
      controller.abort()
    }
  }, [id])

  const isLoading = query.id !== id || query.status === 'loading'

  return (
    <section>
      {isLoading ? (
        <>
          <h1>História</h1>
          <p role="status">Carregando história...</p>
        </>
      ) : query.status === 'success' ? (
        <article className="story">
          <h1>{query.story.title}</h1>

          <p>
            <strong>ID:</strong> <code>{query.story.id}</code>
          </p>

          <section>
            <h2>Situação</h2>
            <p className="story-text">{query.story.situation}</p>
          </section>

          <section>
            <h2>Tarefa</h2>
            <p className="story-text">{query.story.task}</p>
          </section>

          <section>
            <h2>Ação</h2>
            <p className="story-text">{query.story.action}</p>
          </section>

          <section>
            <h2>Resultado</h2>
            <p className="story-text">{query.story.result}</p>
          </section>

          {query.story.tags.length > 0 && (
            <section>
              <h2>Tags</h2>

              <ul className="story-tags">
                {query.story.tags.map((tag, index) => (
                  <li key={`${tag}-${index}`}>{tag}</li>
                ))}
              </ul>
            </section>
          )}
        </article>
      ) : (
        <>
          <h1>
            {query.status === 'not-found'
              ? 'História não encontrada'
              : 'Erro ao carregar história'}
          </h1>

          <p>
            <strong>ID consultado:</strong> <code>{id}</code>
          </p>

          <p role="alert">{query.error}</p>
        </>
      )}

      <nav aria-label="Navegação de histórias">
        <Link to="/">Voltar ao início</Link>
        {' · '}
        <Link to="/stories/new">Criar nova história</Link>
      </nav>
    </section>
  )
}