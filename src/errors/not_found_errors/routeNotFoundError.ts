import { CustomError } from "../customError";

export class RouteNotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("route not found error");
    Object.setPrototypeOf(this, RouteNotFoundError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "route not found" }];
  }
}
