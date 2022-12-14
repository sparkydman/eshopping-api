import sessionModel from '../model/session.model';

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
