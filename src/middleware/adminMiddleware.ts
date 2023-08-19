import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

export const adminAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user || user.role !== 'admin') {
    return next(new AppError(403, 'You do not have permission to perform this action'));
  }

  next();
};
