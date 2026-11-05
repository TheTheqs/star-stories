import { Link, Route, Routes } from 'react-router'

import HomePage from './pages/home-page.jsx'
import CreateStoryPage from './pages/create-story-page.jsx'
import StoryPage from './pages/story-page.jsx'
import EditStoryPage from './pages/edit-story-page.jsx'
import SearchStoriesPage from './pages/search-stories-page.jsx'

export default function App() {
  return (
    <>
      <header>
        <Link to="/">Star Stories</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories/new" element={<CreateStoryPage />} />
          <Route path="/stories/:id" element={<StoryPage />} />
          <Route path="/stories/:id/edit" element={<EditStoryPage />} />
          <Route path="/search" element={<SearchStoriesPage />} />

          <Route
            path="*"
            element={
              <section>
                <h1>Página não encontrada</h1>
                <Link to="/">Voltar ao início</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </>
  )
}