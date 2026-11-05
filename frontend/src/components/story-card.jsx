import { Link } from 'react-router'

export default function StoryCard({ story }) {
  return (
    <Link
      className="story-card"
      to={`/stories/${encodeURIComponent(story.id)}`}
    >
      <h2>{story.title}</h2>

      {story.tags.length > 0 ? (
        <ul className="story-tags">
          {story.tags.map((tag, index) => (
            <li key={`${tag}-${index}`}>{tag}</li>
          ))}
        </ul>
      ) : (
        <p className="story-card-empty">Sem tags</p>
      )}
    </Link>
  )
}