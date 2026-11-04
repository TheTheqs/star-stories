import {Router} from "express";

export function createStoryRoutes(controller)
{
    const router = Router();

    router.post("/", async (req, res) =>
    {
        await controller.createStory(req, res);
    });

    return router;
}