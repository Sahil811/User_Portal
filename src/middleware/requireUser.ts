/**
 * Middleware function to require an authenticated user.
 * It checks if a user is available in res.locals and enforces the presence of a valid user.
 * @param req The Express Request object.
 * @param res The Express Response object.
 * @param next The next middleware function.
 */

import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return next(new AppError(400, `Session has expired or user doesn't exist`));
    }

    next();
  } catch (err: unknown) {
    next(err);
  }
};
