
import express from "express";
import { requireAuth } from "../../middleware/require-auth.js";
import { userRoutes } from "../routes.js";
import { getCurrentTaskHandler } from "./controller/handlers/get-current-task.js";
import { finishChatHandler } from "./controller/handlers/episode-finished.js";
import { finishEvaluationHandler } from "./controller/handlers/evalutation-finished.ts";

const router = express.Router();

router.get(userRoutes.GetCurrentTask, requireAuth, getCurrentTaskHandler);
router.post(userRoutes.FinishChat, requireAuth, finishChatHandler);
router.post(userRoutes.FinishEvaluation, requireAuth, finishEvaluationHandler);

export { router as userRouter };