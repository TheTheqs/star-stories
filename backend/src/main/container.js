import {IdGenerator} from "../application/services/id-generator.js";
import {InMemoryStoryRepository} from "../infrastructure/repositories/in-memory-story-repository.js";
import {CreateStoryUseCase} from "../application/use-cases/create-story-use-case.js";
import {GetStoryUseCase} from "../application/use-cases/get-story-use-case.js";
import {StoryController} from "../presentation/controllers/story-controller.js";

const idGenerator = new IdGenerator();
const storyRepository = new InMemoryStoryRepository();
const createStoryUseCase = new CreateStoryUseCase(storyRepository, idGenerator);
const getStoryUseCase = new GetStoryUseCase(storyRepository);
const storyController = new StoryController(createStoryUseCase, getStoryUseCase);

export {storyController};