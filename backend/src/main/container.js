import {IdGenerator} from "../application/services/id-generator.js";
import {SqliteStoryRepository} from "../infrastructure/repositories/sqlite-story-repository.js";
import { database } from '../infrastructure/database/connection.js';
import {CreateStoryUseCase} from "../application/use-cases/create-story-use-case.js";
import {GetStoryUseCase} from "../application/use-cases/get-story-use-case.js";
import {UpdateStoryUseCase} from "../application/use-cases/update-story-use-case.js";
import {DeleteStoryUseCase} from "../application/use-cases/delete-story-use-case.js";
import {SearchStoriesUseCase} from "../application/use-cases/search-stories-use-case.js";
import {StoryController} from "../presentation/controllers/story-controller.js";

const idGenerator = new IdGenerator();
const storyRepository = new SqliteStoryRepository(database);
const createStoryUseCase = new CreateStoryUseCase(storyRepository, idGenerator);
const getStoryUseCase = new GetStoryUseCase(storyRepository);
const updateStoryUseCase = new UpdateStoryUseCase(storyRepository);
const deleteStoryUseCase = new DeleteStoryUseCase(storyRepository);
const searchStoriesUseCase = new SearchStoriesUseCase(storyRepository);
const storyController = new StoryController(createStoryUseCase, getStoryUseCase, updateStoryUseCase, deleteStoryUseCase, searchStoriesUseCase);

export {storyController};