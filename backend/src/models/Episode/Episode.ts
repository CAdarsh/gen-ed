import mongoose from "mongoose";
import { OpenAIChatModels } from "../../utils/gpt-models.js";
import { Topics } from "../Topic.js";
import get_conversation_log from "./methods/get_conversation_log.js";

interface EpisodeAttrs {
  subTopicId: string;
  userId: string;
}



interface EpisodeDoc extends mongoose.Document {
  subTopicId: string;
  userId: string;
  turns: { _id?: string, prompt: string, diffusionPrompt: string, response: string, timestamp: Date, }[];
  evaluation: { _id?: string, prompt: string, diffusionPrompts1: string, diffusionPrompt2: string, response: string, answer: string }[];
  episodeEnd?: Date;
  evaluationEnd?: Date;
  getConversationLog(): Promise<string[]>;
}
interface EpisodeModel extends mongoose.Model<EpisodeDoc> {
  build(attrs: EpisodeAttrs): EpisodeDoc;
}

const episodesSchema = new mongoose.Schema({

  subTopicId: {
    type: mongoose.Types.ObjectId,
    ref: "SubTopic",
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  turns: [
    {
      prompt: {
        type: String
      },
      response: {
        type: String
      },
      diffusionPrompt: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now()
      },
    }
  ],
  episodeEnd: {
    type: Date,
    default: Date.now()
  },
  evaluationEnd: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
    }
  }
})

episodesSchema.index({ "topicId": 1, "userId": 1 })

episodesSchema.statics.build = (attrs: EpisodeAttrs) => {
  return new Episodes(attrs);
}

episodesSchema.methods.getConversationLog = get_conversation_log;


const Episodes = mongoose.model<EpisodeDoc, EpisodeModel>('Episodes', episodesSchema);

export { Episodes, EpisodeDoc }
