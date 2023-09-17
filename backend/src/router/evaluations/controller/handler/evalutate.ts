import { Request, Response, raw } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.ts';
import { LLMChain } from 'langchain/chains'
import { ChatOpenAI } from "langchain/chat_models";


import {
  PromptTemplate,
} from "langchain/prompts";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { Episodes } from '../../../../models/Episode/Episode.ts';

import { llm } from '../../../../services/llm.ts';
import { templates } from '../../../../utils/templates.ts';
import { logger } from '../../../../services/logger.ts';
import { Topics } from '../../../../models/Topic.ts';
import { SubTopics } from '../../../../models/SubTopics.ts';


const handler = async (req: Request, res: Response) => {

  const user = req.currentUser



  try {

    const episode = await Episodes.findById(user!.currentEpisodeId)
    if (!episode) {
      throw new BadRequestError("Episode not found")
    }

    const promptTemplate = new PromptTemplate({
      template: templates.evaluationTemplate,
      inputVariables: ["topic", "character", "age"]
    });



    const chat = new ChatOpenAI({
      verbose: true,
      modelName: 'gpt-4',
      temperature: 1
    });

    const chain = new LLMChain({
      prompt: promptTemplate,
      llm: chat,
    });


    const data = await chain.call({
      character: user!.favouriteCharacter,
      topic: episode.topic,
      age: user!.age
    });


    // parse the data from the following format:
    // Question: Hi there, it's Elsa from Frozen! Can you tell me which object will fall faster in the absence of air resistance, a snowball or an ice cube?\n\nCorrect Option: They fall at the same rate\nCorrect Image Prompt: Elsa standing with a snowball and an ice cube falling at the same speed\n\nWrong Option: Snowball falls faster\nWrong Image Prompt: Elsa watching the snowball fall faster than the ice cube\n\nCorrect answer explanation: Gravity impacts all objects equally, regardless of their mass.\n\nWrong answer explanation: Gravity does not cause lighter objects to fall slower.

    const question = data.text.split("Question:").pop()?.split("Correct Option:")[0].trim()
    const correctOption = data.text.split("Correct Option:").pop()?.split("Correct Image Prompt:")[0].trim()
    const correctImagePrompt = data.text.split("Correct Image Prompt:").pop()?.split("Wrong Option:")[0].trim()
    const wrongOption = data.text.split("Wrong Option:").pop()?.split("Wrong Image Prompt:")[0].trim()
    const wrongImagePrompt = data.text.split("Wrong Image Prompt:").pop()?.split("Correct answer explanation:")[0].trim()
    const correctAnswerExplanation = data.text.split("Correct answer explanation:").pop()?.split("Wrong answer explanation:")[0].trim()
    const wrongAnswerExplanation = data.text.split("Wrong answer explanation:").pop()?.trim()



    res.status(StatusCodes.OK).send({
      question,
      correctAnswer: correctOption,
      correctImagePrompt,
      wrongOption,
      wrongImagePrompt,
      correctAnswerExplanation,
      wrongAnswerExplanation
    });



  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as evaluateHandler,
};
