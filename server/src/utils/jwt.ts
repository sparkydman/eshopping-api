import jwt from 'jsonwebtoken';
import config from 'config';

export function signToken(
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  try {
    // const privateKey = Buffer.from(config.get<string>(key), 'base64').toString(
    //   'ascii'
    // );

    const token = jwt.sign(payload, config.get<string>(key), {
      ...(options && options),
      algorithm: 'RS256',
    });

    return token;
  } catch (error: any) {
    console.log(error);
  }
}

export function verifyToken(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  try {
    // const publicKey = Buffer.from(config.get<string>(key), 'base64').toString(
    //   'ascii'
    // );
    const decoded = jwt.verify(token, config.get<string>(key));
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
