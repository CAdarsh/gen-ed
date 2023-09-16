import { NextFunction, Request, Response } from "express";

import { logger } from "../services/logger.js";

import { Users, UserDoc } from "../models/User/User.js";



export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.header("Authorization")?.replace("Bearer ", "");

  try {

    if (!token) {
      return next();
    }

    const user = await Users.findOne({ _id: token }) as UserDoc;
    req.currentUser = user;

  } catch (error) {
    logger.error(error);
    logger.error(JSON.stringify({
      error: "JWT TOKEN MALFORMED",
      token
    }));
    return next();
  }

  next();

}
