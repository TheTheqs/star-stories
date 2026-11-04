import { Link, useNavigate, useParams } from 'react-router'

import { updateStory } from '../api/stories.js'
import StoryForm from '../components/story-form.jsx'
import { useStory } from '../hooks/use-story.js'

export default function EditStoryPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const query = useStory(id)

  async function handleSave(storyData) {
    const story = await updateStory(id, {
      ...storyData,
      id,
    })

    navigate(`/stories/${encodeURIComponent(story.id)}`, {
      replace: true,
    })
  }

  return (
    <section>
      <h1>Editar história</h1>

      {query.isLoading ? (
        <p role="status">Carregando história...</p>
      ) : query.status === 'success' ? (
        <StoryForm
          key={query.story.id}
          initialStory={query.story}
          onSave={handleSave}
          submitLabel="Salvar alterações"
        />
      ) : (
        <p role="alert">{query.error}</p>
      )}

      <p>
        <Link to={`/stories/${encodeURIComponent(id)}`}>
          Voltar para a história
        </Link>
      </p>
    </section>
  )
}