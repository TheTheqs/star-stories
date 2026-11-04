import { useEffect, useState } from 'react'

import { ApiError, getStory } from '../api/stories.js'

export function useStory(id) {
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
            : 'Não foi possível carregar a história.',
        })
      }
    }

    loadStory()

    return () => controller.abort()
  }, [id])

  return {
    ...query,
    isLoading: query.id !== id || query.status === 'loading',
  }
}