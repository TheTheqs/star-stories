const STORIES_URL = '/api/stories'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function readResponse(response) {
  let data

  try {
    data = await response.json()
  } catch {
    throw new ApiError(
      'O servidor retornou uma resposta inesperada.',
      response.status,
    )
  }

  if (!response.ok) {
    const message =
      typeof data?.error === 'string'
        ? data.error
        : 'Não foi possível concluir a requisição.'

    throw new ApiError(message, response.status)
  }

  return data
}

export async function createStory(storyData) {
  const response = await fetch(STORIES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(storyData),
  })

  return readResponse(response)
}

export async function getStory(id, { signal } = {}) {
  const response = await fetch(
    `${STORIES_URL}/${encodeURIComponent(id)}`,
    { signal },
  )

  return readResponse(response)
}