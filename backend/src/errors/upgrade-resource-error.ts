import { CustomError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

export class UpgradeRequiredError extends CustomError {
  statusCode = StatusCodes.PAYMENT_REQUIRED;

  serializeErrors(): { message: string; field: string }[] {
    return [{
      field: this.field,
      message: this.message
    }];
  }

  constructor(public message: string, public field: string) {
    super(message);

    Object.setPrototypeOf(this, UpgradeRequiredError.prototype);
  }

}