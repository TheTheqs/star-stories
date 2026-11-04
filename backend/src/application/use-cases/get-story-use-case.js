import { NotFoundError } from "../../models/not-found-error.js";

export class GetStoryUseCase
{
    constructor(storyRepository)
    {
        this.storyRepository = storyRepository;
    }

    async execute(id)
    {
        const story = await this.storyRepository.findById(id);
        if (!story)
        {
            throw new NotFoundError(`Story with id ${id} not found`);
        }
        return story;
    }
}