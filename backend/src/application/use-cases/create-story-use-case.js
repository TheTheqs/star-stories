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
        const story = new Story({...data, id});
        await this.storyRepository.save(story);
        return story;
    }
}