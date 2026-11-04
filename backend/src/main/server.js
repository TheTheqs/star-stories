import express from 'express';
import {createStoryRoutes} from "../presentation/routes/story-routes.js";
import {storyController} from "./container.js";

const app = express();

app.use(express.json());

app.use('/stories', createStoryRoutes(storyController));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});