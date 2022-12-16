import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';

export async function requiredUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = get(res.locals, 'user');
  if (!user) {
    return res.status(401).send('login is required');
  }

  return next();
}
