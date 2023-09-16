import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

export class NotFoundError extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;
    message = "Not found"
    constructor() {
        super('route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);

    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: this.message
        }];
    }

}