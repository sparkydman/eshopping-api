import { Request, Response } from 'express';
import config from 'config';
import { get } from 'lodash';
import {
  createUserSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { validateUserPassword } from '../service/user.service';
import { signToken } from '../utils/jwt';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validateUserPassword(req.body);
  if (!user) {
    res.status(400);
    return res.send('Incorrect user email or password');
  }

  //create user session
  const userSession = await createUserSession({
    userId: user._id,
    userAgent: req.get('user-get') || '',
  });

  // generate access token
  const accessTtl = config.get<string>('accessTokenTtl'); // 15minutes
  const accessToken = signToken(
    { ...user, session: userSession._id },
    'accessTokenPrivateKey',
    { expiresIn: accessTtl }
  );

  //generate refresh token
  const refreshTtl = config.get<string>('refreshTokenTtl'); // 1year
  const refreshToken = signToken(
    { ...user, session: userSession._id },
    'refreshTokenPrivateKey',
    { expiresIn: refreshTtl }
  );

  res.send({ accessToken, refreshToken });
}

export async function getUserSessions(req: Request, res: Response) {
  const userId = get(res.locals.user, '_id');

  const sessions = await findSessions({ userId, isValid: true });
  res.send(sessions);
}

export async function deleteUserSessions(req: Request, res: Response) {
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { isValid: false });
  res.send({
    accessToken: null,
    refreshToken: null,
  });
}
