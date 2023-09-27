import { CustomError } from "../customError";

export class ResourceNotFoundError extends CustomError {
  statusCode = 404;
  constructor(public resourceName: string) {
    super("resource not found error");
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: `${this.resourceName} not found` }];
  }
}
