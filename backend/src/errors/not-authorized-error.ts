import { CustomError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

export class NotAuthorizedError extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Not authorized';

    serializeErrors() {
        return [
            {
                message: this.message
            }
        ]
    }
    constructor() {
        super('user not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }
}