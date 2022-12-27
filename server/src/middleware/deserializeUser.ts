import { get } from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { renewAccessToken } from '../service/session.service';
import config from 'config';

export async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '')?.replace(/^Bearer\s/, '');
  const refreshToken =
    get(req, 'cookies.refreshToken') ||
    get(req, 'headers.x-refresh')?.toString();

  if (!accessToken && !refreshToken) {
    return next();
  }

  let isExpired = true;

  if (accessToken) {
    const { decoded, expired } = verifyToken(
      accessToken,
      'accessTokenPublicKey'
    );

    isExpired = expired;

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }
  }

  if (isExpired && refreshToken) {
    const newAccessToken = await renewAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken as string);
      res.cookie('accessToken', newAccessToken, {
        domain: config.get<string>('cookieDomain'),
        httpOnly: true,
        maxAge: config.get<number>('cookieAccessTokenMaxAge'), //15 minutes
        path: config.get<string>('cookiePath'),
        sameSite: 'strict',
        secure: process.env.NODE_ENV == 'production',
      });
    }
    const result = verifyToken(
      newAccessToken as string,
      'accessTokenPublicKey'
    );
    res.locals.user = result.decoded;
    return next();
  }

  return next();
}
