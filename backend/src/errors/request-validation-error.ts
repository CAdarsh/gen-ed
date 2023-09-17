import { CustomError } from "./custom-error.js";
import { ValidationError } from "express-validator";
import { StatusCodes } from "http-status-codes";

export class RequestValidationError extends CustomError {
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');
        //only because we are extending a builtin class
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return this.errors.map((error) => {
            return {
                message: error.msg,
                field: error.type
            }
        })
    }
}