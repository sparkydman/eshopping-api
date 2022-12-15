import { FilterQuery } from 'mongoose';
import { get } from 'lodash';
import config from 'config';
import sessionModel, { SessionDocument } from '../model/session.model';
import { signToken, verifyToken } from '../utils/jwt';
import userModel from '../model/user.model';

export async function createUserSession({
  userId,
  userAgent,
}: {
  userId: string;
  userAgent: string;
}) {
  const session = await sessionModel.create({ userId, userAgent });

  return session;
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await sessionModel.find(query).lean();
}

export async function renewAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyToken(refreshToken, 'refreshTokenPublicKey');
  if (decoded && !get(decoded, 'session')) return false;

  const session = await sessionModel.findById(get(decoded, 'session'));
  if (!session) return false;
  if (session && !session.isValid) return false;

  const user = await userModel.findById(session.userId);
  if (!user) return false;

  const newAccessToken = signToken(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get<string>('accessTokenTtl') }
  );

  return newAccessToken;
}
