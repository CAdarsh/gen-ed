import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../../errors/bad-request-error.js";
import { NextFunction } from "express";
import { create_episode } from "./methods/create_episode.js";
import { EpisodeDoc } from "../Episode/Episode.js";

interface UserAttrs {
  topicIds: string[];
  name: string;
  email: string;
  currentTaskId: string;
}

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  currentTaskId: string;
  episodeHistory: string[];
  scorePerEpisode: number[];
  currentEpisodeId?: string;
  currentEvaluationId?: string;
  create_episode(familiarity: number, initialJudgement: string, stance: number): Promise<EpisodeDoc>;
}


interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    currentTaskId: {
      type: mongoose.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    currentEpisodeId: {
      type: mongoose.Types.ObjectId,
      ref: "Episode",
    },
    currentEvaluationId: {
      type: mongoose.Types.ObjectId,
      ref: "Evaluation",
    },
    episodeHistory: [{
      type: mongoose.Types.ObjectId,
      ref: "Episode",
    }],
    scorePerEpisode: [{
      type: Number,
    }]
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
      }
    }
  }
)

userSchema.statics.build = (attrs: UserAttrs) => {
  return new Users(attrs);
};

userSchema.methods.create_episode = create_episode;

const Users = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { Users };
