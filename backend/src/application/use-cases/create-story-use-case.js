export class CreateStoryUseCase
{
    constructor(storyRepository, idGenerator)
    {
        this.storyRepository = storyRepository;
        this.idGenerator = idGenerator;
    }

    async execute(data)
    {
        const id = this.idGenerator.generateId();
        const story = new Story({id, ...data});
        await this.storyRepository.save(story);
        return story;
    }
}