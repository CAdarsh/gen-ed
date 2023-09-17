import { CustomError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

export class ForbiddenResourceError extends CustomError {
  statusCode = StatusCodes.FORBIDDEN;

  serializeErrors(): { message: string; field?: string }[] {
    return [{
      message: this.message
    }];
  }

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenResourceError.prototype);
  }

}