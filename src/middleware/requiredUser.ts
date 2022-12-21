import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';

export function requiredUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = get(res.locals, 'user');
  if (!user) {
     res.status(401)
     return res.send('login is required');
  }

  return next();
}
