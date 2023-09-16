import express from 'express';
import { requireAuth } from '../../middleware/require-auth.js';
import { evaluationRoutes } from 'router/routes.ts';
import { answerHandler } from './controller/handler/answer.ts';
import { evaluateHandler } from './controller/handler/evalutate.ts';
const router = express.Router();

router.post(evaluationRoutes.Evaluate, requireAuth, evaluateHandler)
router.get(evaluationRoutes.answer, requireAuth, answerHandler)


export {
  router as evaluateRouter
};

