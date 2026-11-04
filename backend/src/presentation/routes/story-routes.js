import { Router } from "express";

export function createStoryRoutes(controller) {
    const router = Router();

    router.post("/", (req, res) => controller.createStory(req, res));
    router.get("/:id", (req, res) => controller.getStory(req, res)); 

    return router;
}