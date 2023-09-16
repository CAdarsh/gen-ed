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

  const { favouriteCharacter, age, topic } = req.body;
  const user = req.currentUser



  // if (!input) {
  //   throw new BadRequestError("Input is required");
  // }

  try {

    // create episode
    await user?.create_episode(topic)

    // get the episode
    const episode = await Episodes.findById(user!.currentEpisodeId)
    if (!episode) {
      throw new BadRequestError("episode not found")
    }

    // Retrieve the conversation log and save the user's prompt
    const conversationLog = await episode.getConversationLog()
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


    // const data = await chain.call({
    //   question: input,
    //   conversationHistory,
    //   topic: episode.topic
    // });

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

    // episode.turns.push({
    //   prompt: input,
    //   response: data.text,
    //   timestamp: new Date(),
    // });



    // const response = {
    //   "_id": episode.turns[episode.turns.length - 1]._id,
    //   "text": data.text,
    //   "image": "imageCaptionResult.text",
    // }
    res.status(StatusCodes.OK).send([
      {
        text: {
          type: "Once upon a time, Elsa from Frozen found an apple. She observed it closely and wondered why it always fell down when she dropped it."
        },
        imageCaption: {
          type: "Elsa holding an apple, looking curiously at it."
        },
      },
      {
        text: {
          type: "\"Why doesn't it soar into the sky?\" She asked Olaf, her snowman friend. Olaf grinned, \"That's Gravity, Elsa!\" Elsa was curious, \"Gravity, what's that?\""
        },
        imageCaption: {
          type: "Elsa talking to Olaf about the apple and gravity."
        },
      },
      {
        text: {
          type: "Olaf began glowing with happiness as he got a chance to teach Elsa, \"Gravity is like a giant magnet beneath our feet. It pulls everything towards the Earth.\""
        },
        imageCaption: {
          type: "Olaf explaining about gravity to Elsa with a huge magnet beneath their feet in the background."
        },
      },
      {
        text: {
          type: "Elsa waved her magic, making the apple float! But before she could say \"Wow\", it fell back down again. \"Haha, Elsa, even magic can't beat gravity!\" Olaf giggled. Elsa giggled back and finally understood that gravity stops us from floating into space!"
        },
        imageCaption: {
          type: "Elsa uses her magic to make the apple float, but it falls back down again."
        },
      }
    ]
    );



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
