import jwt from 'jsonwebtoken';
import config from 'config';

export function signToken(
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  const privateKey = Buffer.from(config.get<string>(key), 'base64').toString(
    'ascii'
  );

  const token = jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });

  return token;
}

export function verifyToken(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  try {
    const publicKey = Buffer.from(config.get<string>(key), 'base64').toString(
      'ascii'
    );
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      dcoded: null,
    };
  }
}
