import { CustomError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: this.message
        }];
    }

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

}