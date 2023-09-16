import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { Episodes } from '../../../../models/Episode/Episode.js';

const handler = async (req: Request, res: Response) => {

  const user = req.currentUser

  try {

    const episode = await Episodes.findById(user!.currentEpisodeId)
    if (!episode) {
      throw new BadRequestError("Episode not found, please provide your initial judgement")
    }
    const conversationLog = episode.turns;

    return res.send(conversationLog)
  } catch (error) {
    //@ts-ignore
    console.error(error)

    throw new BadRequestError("Something went wrong")
  }
}

export {
  handler as chatHistoryHandler,
};