export class Story
{
    constructor({id, title, situation, task, action, result, tags})
    {
        const requiredFields = [id, title, situation, task, action, result];
        for (const field of requiredFields)
        {
            if(field.trim() === "" || field.trim() == null)
            {
                throw new ValidationError(`Field '${field}' is required`);
            }
        }

        if(!Array.isArray(tags))
        {
            throw new ValidationError("Tags must be an array");
        }

        for(const tag of tags)
        {
            if(tag.trim() === "" || tag.trim() == null)
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
        this.tags = tags;
    }
}