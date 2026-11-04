import { ValidationError } from "../../models/validation-error.js";
import { NotFoundError } from "../../models/not-found-error.js";

export class StoryController
{
    constructor(createStoryUseCase, getStoryUseCase)
    {
        this.createStoryUseCase = createStoryUseCase;
        this.getStoryUseCase = getStoryUseCase;
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
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async getStory(req, res)
    {
        try
        {
            const storyId = req.params.id;
            const story = await this.getStoryUseCase.execute(storyId);
            res.status(200).json(story);
        }
        catch (error)
        {
            if (error instanceof NotFoundError)
            {
                res.status(404).json({ error: error.message });
            }
            else
            {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }   
    }
}