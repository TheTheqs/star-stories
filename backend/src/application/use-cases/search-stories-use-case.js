import { ValidationError } from '../../models/validation-error.js'

export class SearchStoriesUseCase {
  constructor(storyRepository) {
    this.storyRepository = storyRepository
  }

  async execute(query) {
    if (typeof query !== 'string' || query.trim() === '') {
      throw new ValidationError('Informe um termo para buscar histórias.')
    }

    const term = query.trim()

    return this.storyRepository.search(term)
  }
}