import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { CustomError } from "../errors/customError";

/**
 * The error handling middleware function should take four parameters: err, req, res, and next
 * When an error is thrown or passed to the next function with an argument (an error object)
 * within one of your route handlers or middleware functions,
 * Express begins to search for an error-handling middleware.
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // determine the error type
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    message: err.message
  });
};
