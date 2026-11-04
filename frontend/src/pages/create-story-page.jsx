import { Link, useNavigate } from 'react-router'

import { createStory } from '../api/stories.js'
import StoryForm from '../components/story-form.jsx'

export default function CreateStoryPage() {
  const navigate = useNavigate()

  async function handleSave(storyData) {
    const story = await createStory(storyData)

    navigate(`/stories/${encodeURIComponent(story.id)}`)
  }

  return (
    <section>
      <h1>Criar história</h1>

      <p>Organize sua experiência usando o formato STAR.</p>

      <StoryForm onSave={handleSave} />

      <p>
        <Link to="/">Voltar ao início</Link>
      </p>
    </section>
  )
}