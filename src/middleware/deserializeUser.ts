import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { renewAccessToken } from '../service/session.service';

export async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, 'headers.authorization', '')?.replace(
    /^Bearer\s/,
    ''
  );
  const refreshToken = get(req, 'headers.x-refresh')?.toString();

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyToken(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await renewAccessToken({ refreshToken });

    if (!newAccessToken) return next();

    const result = verifyToken(newAccessToken, 'accessTokenPublicKey');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
}
