import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { createStory } from '../api/stories.js'

const initialValues = {
  title: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  tags: '',
}

export default function CreateStoryPage() {
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmitting) return

    setError('')

    const storyData = {
      title: values.title.trim(),
      situation: values.situation.trim(),
      task: values.task.trim(),
      action: values.action.trim(),
      result: values.result.trim(),
      tags: values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    const requiredFields = [
      storyData.title,
      storyData.situation,
      storyData.task,
      storyData.action,
      storyData.result,
    ]

    if (requiredFields.some((value) => value === '')) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }

    setIsSubmitting(true)

    try {
      const story = await createStory(storyData)

      navigate(`/stories/${encodeURIComponent(story.id)}`)
    } catch (error) {
      setError(
        error instanceof TypeError
          ? 'Não foi possível conectar ao servidor.'
          : error.message || 'Não foi possível salvar a história.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h1>Criar história</h1>

      <p>Organize sua experiência usando o formato STAR.</p>

      <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="situation">Situação</label>
        <textarea
          id="situation"
          name="situation"
          rows={4}
          value={values.situation}
          onChange={handleChange}
          placeholder="Qual era o contexto?"
          required
        />

        <label htmlFor="task">Tarefa</label>
        <textarea
          id="task"
          name="task"
          rows={4}
          value={values.task}
          onChange={handleChange}
          placeholder="Qual era sua responsabilidade ou objetivo?"
          required
        />

        <label htmlFor="action">Ação</label>
        <textarea
          id="action"
          name="action"
          rows={4}
          value={values.action}
          onChange={handleChange}
          placeholder="O que você fez?"
          required
        />

        <label htmlFor="result">Resultado</label>
        <textarea
          id="result"
          name="result"
          rows={4}
          value={values.result}
          onChange={handleChange}
          placeholder="Qual foi o resultado das suas ações?"
          required
        />

        <label htmlFor="tags">Tags (opcional)</label>
        <input
          id="tags"
          name="tags"
          value={values.tags}
          onChange={handleChange}
          placeholder="liderança, comunicação, automação"
          aria-describedby="tags-help"
        />
        <small id="tags-help">Separe as tags por vírgulas.</small>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar história'}
        </button>
      </form>

      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  )
}