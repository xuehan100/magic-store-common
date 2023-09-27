import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// telling typescript, inside the Express project,
// find Request interface, and add additional property currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first check if session is defined, if it is, check the jwt property
  if (!req.session?.jwt) {
    // return and move onto next middleware in the chains
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.log(`jwt verify error, ${err}`);
  }

  next();
};
