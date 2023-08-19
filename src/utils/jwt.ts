import fs from 'fs';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

/**
 * Read key from file.
 *
 * @param {string} keyFilePath - The file path of the key.
 * @returns {string} - The key content as a string.
 */
export function readKeyFromFile(keyFilePath: string): string {
  return fs.readFileSync(keyFilePath, 'utf8');
}

/**
 * Sign a JSON Web Token (JWT) with the specified payload, key, and options.
 *
 * @param {object} payload - The payload to include in the JWT.
 * @param {string} keyFilePath - The file path of the key.
 * @param {SignOptions} options - Additional options for JWT signing (optional).
 * @returns {string} - The signed JWT.
 */
export const signJwt = (payload: object, keyFilePath: string, options: SignOptions) => {
  const key = readKeyFromFile(config.get<string>(keyFilePath));
  return jwt.sign(payload, key, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

/**
 * Verify a JSON Web Token (JWT) using the specified token and key.
 *
 * @template T - The type of the payload.
 * @param {string} token - The JWT to verify.
 * @param {string} keyFilePath - The file path of the key.
 * @returns {T | null} - The decoded payload or null if verification fails.
 */
export const verifyJwt = <T>(token: string, keyFilePath: string): T | null => {
  try {
    const key = readKeyFromFile(config.get<string>(keyFilePath));
    const decoded = jwt.verify(token, key) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
