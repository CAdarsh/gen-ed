import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

export class MethodNotAllowed extends CustomError {
  statusCode = StatusCodes.METHOD_NOT_ALLOWED;
  message = "Method currently not allowed"
  constructor() {
    super('method currently not allowed');

    Object.setPrototypeOf(this, MethodNotAllowed.prototype);

  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{
      message: this.message
    }];
  }

}