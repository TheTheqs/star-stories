import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'

import { deleteStory } from '../api/stories.js'
import { useStory } from '../hooks/use-story.js'

export default function StoryPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const query = useStory(id)

  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (isDeleting) return

    const confirmed = window.confirm(
      'Deseja excluir esta história? Essa ação não pode ser desfeita.',
    )

    if (!confirmed) return

    setIsDeleting(true)

    try {
      await deleteStory(id)

      window.alert('História excluída com sucesso.')
      navigate('/', { replace: true })
    } catch (error) {
      window.alert(
        error instanceof TypeError
          ? 'Não foi possível conectar ao servidor.'
          : error.message || 'Não foi possível excluir a história.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section>
      {query.isLoading ? (
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

          <div className="story-actions" aria-busy={isDeleting}>
            {!isDeleting && (
              <Link to={`/stories/${encodeURIComponent(id)}/edit`}>
                Editar história
              </Link>
            )}

            <button
              type="button"
              className="button-danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Deletar história'}
            </button>
          </div>

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