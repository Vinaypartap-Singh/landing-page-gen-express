import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleTryResponseHandler } from "../utils/helper";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader === null || authHeader === undefined) {
    return handleTryResponseHandler(res, 400, "Unauthorized Access");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_TOKEN as string, (err: any, user: any) => {
    if (err) {
      return handleTryResponseHandler(res, 400, "Unauthorized Access");
    }
    req.user = user;
    next();
  });
};
