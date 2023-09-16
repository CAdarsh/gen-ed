import { Request, Response, raw } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { LLMChain } from 'langchain/chains'
import { ChatOpenAI } from "langchain/chat_models";

import {
  PromptTemplate,
} from "langchain/prompts";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { Episodes } from '../../../../models/Episode/Episode.js';

import { llm } from '../../../../services/llm.js';
import { templates } from '../../../../utils/templates.js';
import { logger } from '../../../../services/logger.js';
import { Topics } from '../../../../models/Topic.js';
import { Evaluations } from '../../../../models/Evaluation/Evaluation.js';

type Reference = {
  text: string;
  link: string;
};


const handler = async (req: Request, res: Response) => {

  const user = req.currentUser
  const input = req.body.input

  if (!input) {
    throw new BadRequestError("input not found")
  }

  try {

    const evaluation = await Evaluations.findById(user!.currentEpisodeId)
    if (!evaluation) {
      throw new BadRequestError("evaluation not found")
    }

    // save the answer in answers array
    evaluation.answers.push({
      answer: input,
      time: new Date()
    })

    await evaluation.save()


    return res.status(StatusCodes.OK).send()
  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as answerHandler,
};
