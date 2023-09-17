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



  // if (!input) {
  //   throw new BadRequestError("Input is required");
  // }

  try {

    const episode = await Episodes.findById(user!.currentEpisodeId)
    if (!episode) {
      throw new BadRequestError("episode not found")
    }

    // Retrieve the conversation log and save the user's prompt
    const conversationLog = await episode.getConversationLog()


    const promptTemplate = new PromptTemplate({
      template: templates.questionSuggestion,
      inputVariables: ["story", "topic", "age"]
    });



    const chat = new ChatOpenAI({
      verbose: true,
      modelName: 'gpt-4',
      temperature: 0.9
    });

    const chain = new LLMChain({
      prompt: promptTemplate,
      llm: chat,
    });


    const data = await chain.call({
      story: episode.rawStory,
      topic: user?.topic,
      age: user?.age

    });

    // parse the data from the following format: QUESTION: <question>\n\nQUESTION: <question>\n\nQUESTION: <question>
    const questions = data.text.split("\n\n").map((question: string) => {
      return question.split("QUESTION:")[1].trim()
    })

    res.status(StatusCodes.OK).send(questions)


  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as questionSuggestionHandler,
};
