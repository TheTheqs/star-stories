import {IdGenerator} from "./id-generator.js";
import {InMemoryStoryRepository} from "../infrastructure/repositories/in-memory-story-repository.js";
import {CreateStoryUseCase} from "../application/use-cases/create-story-use-case.js";

const idGenerator = new IdGenerator();
const storyRepository = new InMemoryStoryRepository();
const createStoryUseCase = new CreateStoryUseCase(storyRepository, idGenerator);
const storyController = new StoryController(createStoryUseCase);

export {storyController};