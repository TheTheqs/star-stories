import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function HomePage() {
  const [storyId, setStoryId] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleConsult(event) {
    event.preventDefault()

    const normalizedId = storyId.trim()

    if (!normalizedId) {
      setError('Informe o ID da história.')
      return
    }

    setError('')
    navigate(`/stories/${encodeURIComponent(normalizedId)}`)
  }

  return (
    <section>
      <h1>Suas histórias no formato STAR</h1>

      <p>
        Registre situações, tarefas, ações e resultados para consultar depois.
      </p>

      <Link to="/stories/new">Criar nova história</Link>
      <p>
        <Link to="/search">Buscar histórias por título ou tag</Link>
      </p>

      <h2>Consultar história</h2>

      <form onSubmit={handleConsult}>
        <label htmlFor="story-id">ID da história</label>

        <input
          id="story-id"
          name="storyId"
          type="text"
          value={storyId}
          onChange={(event) => {
            setStoryId(event.target.value)
            setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'story-id-error' : undefined}
        />

        {error && (
          <p id="story-id-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Consultar história</button>
      </form>
    </section>
  )
}