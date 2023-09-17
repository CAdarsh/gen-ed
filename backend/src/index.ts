import 'dotenv/config'

import { logger } from './services/logger.js';

import { app } from './app.js'

import mongoose from "mongoose";
import { initPineconeClient } from './services/pinecone.js';
import { Users } from './models/User/User.ts';
const start = async () => {
  logger.info('starting up ......');
  // if (!process.env.JWT_SECRET) {
  //   throw new Error("JWT_SECRET must be defined");

  // }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY must be defined");
  }

  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI)
    logger.info("connected to mongodb")
    // initPineconeClient();
    logger.info("connected to pinecone")
  } catch (e) {
    logger.error(e);
    console.log(e);
  }



  // const initialize_docs = async () => {

  //   const site_docs = sites_ref["docs"]
  //   for (let i = 0; i < site_docs.length; i++) {
  //     const docs = Sites.build({
  //       content: site_docs[i]["content"],
  //       title: site_docs[i]["title"],
  //       bias: site_docs[i]["bias"],
  //       topicId: site_docs[i]["topic"]
  //     })

  //     await docs.save()
  //   }

  //   console.log("docs built")
  // }

  //initialize_docs()

  const create_user_if_not_exists = async () => {

    const user = await Users.findOne({})
    if (!user) {
      const user = await Users.build({
        favouriteCharacter: "Harry Potter",
        currentTaskId: "1"
      })

      await user.save()
    }
  }

  create_user_if_not_exists()

  app.listen(process.env.PORT || 8080, () => {
    logger.error("Logger working")
    logger.info(`NODE_ENV ${process.env.NODE_ENV} HOST_ENV ${process.env.HOST_ENV} services running on port ${process.env.PORT}`);
  })
}

process.on('SIGINT', () => { logger.info("Bye bye!"); process.exit(); });
start();
