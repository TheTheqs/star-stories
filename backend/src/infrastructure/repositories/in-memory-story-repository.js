export class InMemoryStoryRepository
{
    constructor()
    {
        this.stories = new Map();
    }

    async save(story)
    {
        this.stories.set(story.id, story);
    }

    async findAll()
    {
        return this.stories;
    }

    async findById(id)
    {
        return this.stories.get(id);
    }
}