import { ValidationError } from "../../models/validation-error.js";
import { NotFoundError } from "../../models/not-found-error.js";

export class StoryController
{
    constructor(createStoryUseCase, getStoryUseCase, updateStoryUseCase, deleteStoryUseCase)
    {
        this.createStoryUseCase = createStoryUseCase;
        this.getStoryUseCase = getStoryUseCase;
        this.updateStoryUseCase = updateStoryUseCase;
        this.deleteStoryUseCase = deleteStoryUseCase;
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
                return this.handleError(error, res)
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
                return this.handleError(error, res);
            }
        }   
    }

    async updateStory(req, res)
    {
        try {
            const story = await this.updateStoryUseCase.execute(
            req.params.id,
            req.body,
            )

            return res.status(200).json(story)
        } catch (error) {
            return this.handleError(error, res)
        }
    }

    async deleteStory(req, res)
    {
        try {
            await this.deleteStoryUseCase.execute(req.params.id)

            return res.status(204).end()
        } catch (error) {
            return this.handleError(error, res)
        }
    }

    handleError(error, res)
    {
        if (error instanceof ValidationError) {
            return res.status(400).json({ error: error.message })
        }

        if (error instanceof NotFoundError) {
            return res.status(404).json({ error: error.message })
        }

        console.error(error)

        return res.status(500).json({
            error: 'Internal server error',
        })
    }
}