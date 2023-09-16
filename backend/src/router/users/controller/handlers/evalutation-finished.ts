// create a api route for getting initial judgement of a user

import { Request, Response } from 'express';
import fs from "fs";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { Users } from '../../../../models/User/User.js';
import { Topics } from '../../../../models/Topic.js';
import { Episodes } from '../../../../models/Episode/Episode.js';
import { Evaluations } from '../../../../models/Evaluation/Evaluation.ts';

const handler = async (req: Request, res: Response) => {
  const user = req.currentUser;

  // set episode episodeEnd time to now
  const evaluation = await Evaluations.findById(user!.currentEvaluationId)

  evaluation!.evaluationEnd = new Date()

  await evaluation!.save()


  res.status(StatusCodes.OK).send()
};

export {
  handler as finishEvaluationHandler,
};