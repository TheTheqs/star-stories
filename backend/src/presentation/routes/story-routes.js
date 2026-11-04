import { Router } from "express";

export function createStoryRoutes(controller)
{
    const router = Router();

    router.post("/", (req, res) => controller.createStory(req, res));
    router.get('/search', (req, res) => {return controller.searchStories(req, res)});
    router.get("/:id", (req, res) => controller.getStory(req, res));
    router.put('/:id', (req, res) => controller.updateStory(req, res))
    router.delete('/:id', (req, res) => controller.deleteStory(req, res))

    return router;
}