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

    async update(story)
    {
        if (!this.stories.has(story.id))
            {
                return false
            }

        this.stories.set(story.id, story)
        return true
    }

    async delete(id)
    {
        return this.stories.delete(id)
    }
}