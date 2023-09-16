import { logger } from "./services/logger.js";

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import 'express-async-errors'; // to use throw in async functions
// import helmet from 'helmet';
import { NotFoundError } from "./errors/not-found-error.js";
import { errorHandler } from "./middleware/error-handler.js";
import { currentUser } from "./middleware/current-user.js";
import { appRoutesPrefix, evaluationRoutePrefix, learnerChatRoutePrefix, userRoutePrefix } from "./router/routes.js";
import { StatusCodes } from "http-status-codes";
import { userRouter } from "./router/users/index.js";
import { evaluateRouter } from "./router/evaluations/index.ts";
import { learnerRouter } from "./router/learner/index.ts";
const app = express();

// app.use(helmet());
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms - :total-time[digits] ms'));


app.get('/_ah/warmup', (_, res) => {
  // Handle your warmup logic. Initiate db connection, etc.
  console.log("Warm up request received... App starting up");
  res.status(StatusCodes.OK).send();
});

app.get('/readiness_check', (req, res) => {
  // Handle your warmup logic. Initiate db connection, etc.
  console.log("Readiness Check: App ready");
  res.status(StatusCodes.OK).send();
});


app.use(currentUser)

app.use(appRoutesPrefix + userRoutePrefix, userRouter);
app.use(appRoutesPrefix + learnerChatRoutePrefix, learnerRouter);
app.use(appRoutesPrefix + evaluationRoutePrefix, evaluateRouter);


// if route does not exist
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  logger.info("Route not found")
  next(new NotFoundError());
})

app.use(errorHandler)



export { app };
