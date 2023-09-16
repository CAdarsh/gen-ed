// create a api route for getting initial judgement of a user

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../../../../errors/index.js';
import { Users } from '../../../../models/User/User.js';

const handler = async (req: Request, res: Response) => {


  const { favouriteCharacter, taskId } = req.body

  if (!favouriteCharacter || !taskId) {
    throw new BadRequestError("email or name not found")
  }


  const user = await Users.build({
    favouriteCharacter,
    currentTaskId: taskId
  })

  await user.save()



  res.status(StatusCodes.OK).send(user)
}

export {
  handler as createUserHandler,
}