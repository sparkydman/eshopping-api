import { FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import config from 'config';
import sessionModel, { SessionDocument } from '../model/session.model';
import { signToken, verifyToken } from '../utils/jwt';
import { findUser } from './user.service';

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
  if (!decoded || !get(decoded, 'session')) return false;

  const session = await sessionModel.findById(get(decoded, 'session'));

  if (!session || !session.isValid) return false;

  const user = await findUser({ _id: session.userId });

  if (!user) return false;

  const newAccessToken = signToken(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get<string>('accessTokenTtl') }
  );

  return newAccessToken;
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await sessionModel.updateOne(query, update);
}
