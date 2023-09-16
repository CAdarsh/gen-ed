export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        // the message to super is just for logging purposes nothing more (it is same as throw new error('message'))
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}