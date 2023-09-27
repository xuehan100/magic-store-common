import { CustomError } from "./customError";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  reason = "Not authorized";

  constructor() {
    super("Not authorized");
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.reason }];
  }
}
