import { Story } from '../../models/story.js'
import { ValidationError } from '../../models/validation-error.js'
import { NotFoundError } from '../../models/not-found-error.js'

export class UpdateStoryUseCase {
  constructor(storyRepository) {
    this.storyRepository = storyRepository
  }

  async execute(id, data) {
    if (
      data === null ||
      typeof data !== 'object' ||
      Array.isArray(data)
    ) {
      throw new ValidationError('Story must be an object')
    }

    if (data.id !== id) {
      throw new ValidationError(
        'Story id must match the id provided in the URL',
      )
    }

    if (data.tags === undefined) {
      throw new ValidationError(
        'Field tags is required; use an empty array to remove all tags',
      )
    }

    const story = new Story(data)

    const updated = await this.storyRepository.update(story)

    if (!updated) {
      throw new NotFoundError(`Story with id ${id} not found`)
    }

    return story
  }
}