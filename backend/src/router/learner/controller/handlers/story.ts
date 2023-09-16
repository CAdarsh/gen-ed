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

type Reference = {
  text: string;
  link: string;
};


const handler = async (req: Request, res: Response) => {

  const { input } = req.body;
  const user = req.currentUser



  if (!input) {
    throw new BadRequestError("Input is required");
  }

  try {

    const episode = await Episodes.findById(user!.currentEpisodeId)
    if (!episode) {
      throw new BadRequestError("Episode not found")
    }
    // Retrieve the conversation log and save the user's prompt
    const conversationLog = await episode.getConversationLog()
    const conversationHistory = conversationLog.slice(-10)


    const promptTemplate = new PromptTemplate({
      template: templates.qaTemplate,
      inputVariables: ["question", "conversationHistory", "topic"]
    });



    const chat = new ChatOpenAI({
      verbose: true,
      modelName: 'gpt-4',
      temperature: 0.7
    });

    const chain = new LLMChain({
      prompt: promptTemplate,
      llm: chat,
    });


    const data = await chain.call({
      question: input,
      conversationHistory,
      topic: episode.topic
    });

    // image caption chain for image generation from the response
    // const imageCaptionTemplate = new PromptTemplate({
    //   template: templates.imageCaptionTemplate,
    //   inputVariables: ["response", "topic", "conversationHistory", "query"]
    // });

    // const imageCaptionChain = new LLMChain({
    //   prompt: imageCaptionTemplate,
    //   llm: chat,
    // });

    // const imageCaptionResult = await imageCaptionChain.call({
    //   response: data.text,
    //   query: input,
    //   topic: topic!.description,
    //   conversationHistory
    // });

    episode.turns.push({
      prompt: input,
      response: data.text,
      timestamp: new Date(),
    });



    const response = {
      "_id": episode.turns[episode.turns.length - 1]._id,
      "text": data.text,
      "image": "imageCaptionResult.text",
    }
    res.status(StatusCodes.OK).send(response);



    //TODO analyze sentiment of the input

    await episode.save();

  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as storyChatHandler,
};
