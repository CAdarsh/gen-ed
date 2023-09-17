import express from 'express';
import { learnerChatRoutes } from '../routes.js';
import { chatHistoryHandler } from './controller/handlers/history.js';
import { requireAuth } from '../../middleware/require-auth.js';
import { storyChatHandler } from './controller/handlers/story.ts';
import { learnChatHandler } from './controller/handlers/chat.ts';
const router = express.Router();

router.post(learnerChatRoutes.Chat, requireAuth, learnChatHandler)
router.post(learnerChatRoutes.Story, requireAuth, storyChatHandler)
router.get(learnerChatRoutes.HistoryChat, requireAuth, chatHistoryHandler)


export {
  router as learnerRouter
};

