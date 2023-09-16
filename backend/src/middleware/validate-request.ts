import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error.js";
import { logger } from "../services/logger.js";


export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logger.info(JSON.stringify({
            path: req.path,
            url: req.url,
            errors: errors.array()
        }))
        throw new RequestValidationError(errors.array());
    }

    next();

}