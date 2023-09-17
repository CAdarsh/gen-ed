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


    const promptTemplate = new PromptTemplate({
      template: templates.unifiedStory,
      inputVariables: ["character", "topic", "age"]
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
      character: favouriteCharacter,
      topic: topic,
      age: age

    });


    // parse text image prompt from the response -> Image prompt: <prompt>\nText: <text>\n---\nImage prompt: <prompt>\nText: <text>\n---...
    const imageCaptions: any[] = []
    const text: string[] = []
    let gender: string = 'M'
    let flag = true
    data.text.split("---").map((item: string) => {
      if (flag) {
        flag = false
        gender = item.split(":")[1].trim()
        return
      }
      let text_img_pair = item.split("\n\n")
      // remove any empty strings
      text_img_pair = text_img_pair.filter((item: string) => item !== "")
      console.log(text_img_pair)
      text.push(text_img_pair[1].split(":")[1].trim())
      imageCaptions.push(text_img_pair[0].split(":")[1].trim())
    })

    // save the response in the episode
    episode.story = text.map((item, index) => {
      return {
        text: item,
        imageCaption: imageCaptions[index]
      }
    })

    res.status(StatusCodes.OK).send(episode.story)

    episode.rawStory = data.text
    episode.gender = gender

    // save the episode
    await episode.save()

    user!.favouriteCharacter = favouriteCharacter
    user!.age = age
    user!.topic = topic
    await user?.save()


  } catch (error) {
    //@ts-ignore
    console.error(error)
    throw new BadRequestError("Something went wrong")

  }
}


export {
  handler as storyChatHandler,
};
