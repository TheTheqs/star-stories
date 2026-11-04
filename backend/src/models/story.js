import { ValidationError } from "./validation-error.js";

export class Story
{
    constructor({id, title, situation, task, action, result, tags = []})
    {
        const requiredFields = {
            id,
            title,
            situation,
            task,
            action,
            result
        };

        for (const [name, value] of Object.entries(requiredFields))
        {
            if (typeof value !== "string" || value.trim() === "")
            {
                throw new ValidationError(`Field '${name}' is required`);
            }
        }

        if (!Array.isArray(tags))
        {
            throw new ValidationError("Tags must be an array");
        }

        for (const tag of tags)
        {
            if (typeof tag !== "string" || tag.trim() === "")
            {
                throw new ValidationError("Tags cannot contain empty values");
            }
        }

        this.id = id;
        this.title = title;
        this.situation = situation;
        this.task = task;
        this.action = action;
        this.result = result;
        this.tags = [...tags];
    }
}