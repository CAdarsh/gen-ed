import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error.js";
import { StatusCodes } from "http-status-codes";
import { logger } from "../services/logger.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof CustomError) {
        if (err.statusCode === StatusCodes.BAD_REQUEST) {
            logger.warn(JSON.stringify(err.serializeErrors()), null, 2)
        }
        return res.status(err.statusCode).send(err.serializeErrors());
    }

    logger.error(JSON.stringify({ msg: err.message, name: err.name, stack: err.stack }));

    res.status(StatusCodes.BAD_REQUEST).send([{ message: 'something went wrong' }])

}