import mongoose from "mongoose";
import { OpenAIChatModels } from "../../utils/gpt-models.js";
import { Topics } from "../Topic.js";
import get_conversation_log from "./methods/get_conversation_log.js";

interface EpisodeAttrs {
  topic: string;
  userId: string;
}



interface EpisodeDoc extends mongoose.Document {
  topic: string;
  userId: string;
  rawStory: string;
  turns: { _id?: string, prompt: string, response: string, timestamp: Date, }[];
  story: { _id?: string, text: string, imageCaption: string, }[];
  episodeEnd?: Date;
  getConversationLog(): Promise<string[]>;
}
interface EpisodeModel extends mongoose.Model<EpisodeDoc> {
  build(attrs: EpisodeAttrs): EpisodeDoc;
}

const episodesSchema = new mongoose.Schema({

  topic: {
    type: String
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  rawStory: {
    type: String
  },
  story: [
    {
      text: {
        type: String
      },
      imageCaption: {
        type: String
      },
    }
  ],
  turns: [
    {
      prompt: {
        type: String
      },
      response: {
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
