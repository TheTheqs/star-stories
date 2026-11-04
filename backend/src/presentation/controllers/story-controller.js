export class StoryController
{
    constructor(createStoryUseCase)
    {
        this.createStoryUseCase = createStoryUseCase;
    }

    async createStory(req, res)
    {
        try
        {
            const storyData = req.body;
            const story = await this.createStoryUseCase.execute(storyData);
            res.status(201).json(story);
        }
        catch (error)
        {
            if (error instanceof ValidationError)
            {
                res.status(400).json({ error: error.message });
            }
            else
            {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}