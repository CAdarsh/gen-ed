import mongoose from "mongoose";
import { OpenAIChatModels } from "../../utils/gpt-models.js";
import { Topics } from "../Topic.js";
import get_conversation_log from "./methods/get_conversation_log.js";

interface EvaluationAttrs {
  topicId: string;
  userId: string;
}



interface EvaluationDoc extends mongoose.Document {
  topicId: string;
  userId: string;
  evaluation: { _id?: string, prompt: string, correctAnsPrompt: string, incorrectAnsPrompt: string, response: string, answer: string, time: Date }[];
  answers: { _id?: string, answer: string, time: Date }[];
  evaluationEnd?: Date;
  getConversationLog(): Promise<string[]>;
}
interface EvaluationModel extends mongoose.Model<EvaluationDoc> {
  build(attrs: EvaluationAttrs): EvaluationDoc;
}

const evaluationsSchema = new mongoose.Schema({

  topicId: {
    type: mongoose.Types.ObjectId,
    ref: "Topic",
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  evaluation: [
    {
      prompt: {
        type: String
      },
      response: {
        type: String
      },
      correctAnsPrompt: {
        type: String
      },
      incorrectAnsPrompt: {
        type: String
      },
      answer: {
        type: String
      },
      time: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  answers: [
    {
      answer: {
        type: String
      },
      time: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  evaluationEnd: {
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

evaluationsSchema.index({ "topicId": 1, "userId": 1 })

evaluationsSchema.statics.build = (attrs: EvaluationAttrs) => {
  return new Evaluations(attrs);
}

evaluationsSchema.methods.getConversationLog = get_conversation_log;


const Evaluations = mongoose.model<EvaluationDoc, EvaluationModel>('Evaluations', evaluationsSchema);

export { Evaluations, EvaluationDoc }
