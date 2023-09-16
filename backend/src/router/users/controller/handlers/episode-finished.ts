// create a api route for getting initial judgement of a user

import { Request, Response } from 'express';
import fs from "fs";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { Users } from '../../../../models/User/User.js';
import { Topics } from '../../../../models/Topic.js';
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

  // see if there are any more subtopics to do
  const topic = await Topics.findById(user!.currentTaskId)
  const subtopics = topic!.subTopics!
  if (subtopics.length > user!.episodeHistory.length) {
    // if there are more subtopics, create a new episode
    const newEpisode = Episodes.build({
      subTopicId: subtopics[user!.episodeHistory.length],
      userId: user!._id,
    });

    // save the episode to the database
    await newEpisode.save();

    // set the user's current episode to the new episode
    user!.currentEpisodeId = newEpisode._id;
  } else {
    // if there are no more subtopics, set the user's current episode to null
    user!.currentEpisodeId = undefined;

    // create evaluation
    const evaluation = await Evaluations.build({
      userId: user!._id,
      topicId: topic!._id,
    })

    await evaluation.save()

  }

  await user!.save()


  res.status(StatusCodes.OK).send(user!.currentEpisodeId)
};

export {
  handler as finishChatHandler,
};