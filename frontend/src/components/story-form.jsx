import { useState } from 'react'

const starFields = [
  { name: 'situation', label: 'Situação' },
  { name: 'task', label: 'Tarefa' },
  { name: 'action', label: 'Ação' },
  { name: 'result', label: 'Resultado' },
]

export default function StoryForm({
  initialStory,
  onSave,
  submitLabel = 'Salvar história',
}) {
  const [values, setValues] = useState(() => ({
    title: initialStory?.title ?? '',
    situation: initialStory?.situation ?? '',
    task: initialStory?.task ?? '',
    action: initialStory?.action ?? '',
    result: initialStory?.result ?? '',
    tags: initialStory?.tags.join(', ') ?? '',
  }))

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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
      await onSave(storyData)
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
    <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
      {initialStory && (
        <p>
          <strong>ID:</strong> <code>{initialStory.id}</code>
        </p>
      )}

      <fieldset disabled={isSubmitting} className="story-form-fields">
        <legend>Dados da história</legend>

        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          required
        />

        {starFields.map(({ name, label }) => (
          <div className="form-field" key={name}>
            <label htmlFor={name}>{label}</label>
            <textarea
              id={name}
              name={name}
              rows={4}
              value={values[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <label htmlFor="tags">Tags (opcional)</label>
        <input
          id="tags"
          name="tags"
          value={values.tags}
          onChange={handleChange}
          aria-describedby="tags-help"
        />
        <small id="tags-help">Separe as tags por vírgulas.</small>

        <button type="submit">
          {isSubmitting ? 'Salvando...' : submitLabel}
        </button>
      </fieldset>

      {error && <p role="alert">{error}</p>}
    </form>
  )
}