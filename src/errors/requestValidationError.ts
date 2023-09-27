import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid reqeust parameter");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      // ValidationError type is now a discriminated union
      // https://express-validator.github.io/docs/migration-v6-to-v7#telling-error-types-apart
      // need to add a check for an error of type field to use the new path property
      if (err.type == "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
