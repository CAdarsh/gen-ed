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
import { Users } from '../../../../models/User/User.ts';


const handler = async (req: Request, res: Response) => {

  const user = await Users.findOne({})


  try {

    const evaluation = await Evaluations.findById(user!.currentEpisodeId)
    if (!evaluation) {
      throw new BadRequestError("evaluation not found")
    }
    // Retrieve the conversation log and save the user's prompt
    const conversationLog = await evaluation.getConversationLog()
    const conversationHistory = conversationLog.slice(-10)


    // const promptTemplate = new PromptTemplate({
    //   template: templates.qaTemplate,
    //   inputVariables: ["question", "conversationHistory", "topic"]
    // });



    // const chat = new ChatOpenAI({
    //   verbose: true,
    //   modelName: 'gpt-4',
    //   temperature: 0.7
    // });

    // const chain = new LLMChain({
    //   prompt: promptTemplate,
    //   llm: chat,
    // });

    // // TODO

    return res.status(StatusCodes.OK).send(
      {
        response: "This is a response",
        correctAnsPrompt: "This is a correct answer prompt",
        incorrectAnsPrompt: "This is an incorrect answer prompt",
        answer: "This is an answer"
      }
    )


  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as evaluateHandler,
};
