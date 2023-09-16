import { CustomError } from "./custom-error.js";
import { StatusCodes } from "http-status-codes";

export class DatabaseConnectionError extends CustomError {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    reason = "Error connecting to database";


    constructor() {
        super("\nError connecting to db\n");
        //only because we are extending a builtin class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{
            message: this.reason
        }];
    }

}