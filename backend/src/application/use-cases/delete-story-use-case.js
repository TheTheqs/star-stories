import { NotFoundError } from '../../models/not-found-error.js'

export class DeleteStoryUseCase {
  constructor(storyRepository) {
    this.storyRepository = storyRepository
  }

  async execute(id) {
    const deleted = await this.storyRepository.delete(id)

    if (!deleted) {
      throw new NotFoundError(`Story with id ${id} not found`)
    }
  }
}