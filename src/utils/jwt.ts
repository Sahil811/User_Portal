import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

/**
 * Sign a JSON Web Token (JWT) with the specified payload, private key, and options.
 *
 * @param {object} payload - The payload to include in the JWT.
 * @param {('accessTokenPrivateKey' | 'refreshTokenPrivateKey')} keyName - The configuration key for the private key.
 * @param {SignOptions} options - Additional options for JWT signing (optional).
 * @returns {string} - The signed JWT.
 */
export const signJwt = (
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions,
) => {
  const privateKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

/**
 * Verify a JSON Web Token (JWT) using the specified token and public key.
 *
 * @template T - The type of the payload.
 * @param {string} token - The JWT to verify.
 * @param {('accessTokenPublicKey' | 'refreshTokenPublicKey')} keyName - The configuration key for the public key.
 * @returns {T | null} - The decoded payload or null if verification fails.
 */
export const verifyJwt = <T>(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
