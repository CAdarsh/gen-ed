// create a api route for getting initial judgement of a user

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Episodes } from '../../../../models/Episode/Episode.js';
import { Evaluations } from '../../../../models/Evaluation/Evaluation.js';

const handler = async (req: Request, res: Response) => {
  const user = req.currentUser;

  // set episode episodeEnd time to now
  const episode = await Episodes.findById(user!.currentEpisodeId)

  episode!.episodeEnd = new Date()

  await episode!.save()

  // add the episode to the user's episode history
  user!.episodeHistory.push(episode!._id);

  // if there are no more subtopics, set the user's current episode to null
  user!.currentEpisodeId = undefined;

  // create evaluation
  const evaluation = await Evaluations.build({
    userId: user!._id,
    topic: episode!.topic,
  })

  await evaluation.save()


  await user!.save()


  res.status(StatusCodes.OK).send(user!.currentEpisodeId)
};

export {
  handler as finishChatHandler,
};