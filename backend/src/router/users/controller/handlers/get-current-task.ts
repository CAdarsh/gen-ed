// create a api route for getting initial judgement of a user

import { Request, Response } from 'express';
import fs from "fs";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { Users } from '../../../../models/User/User.js';
import { Topics } from '../../../../models/Topic.js';

const handler = async (req: Request, res: Response) => {
  const user = req.currentUser;

  const task = await Topics.findById(user!.currentTaskId).select("name description");

  res.status(StatusCodes.OK).send(task);
};

export {
  handler as getCurrentTaskHandler,
};