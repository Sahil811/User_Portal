import { cleanEnv, port, str } from 'envalid';

/**
 * Validate environment variables using envalid library.
 * Throws an error if any required environment variables are missing or invalid.
 *
 * @throws {Error} - Throws an error if any required environment variable is missing or invalid.
 */
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
    JWT_ACCESS_TOKEN_PUBLIC_KEY: str(),
    JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
    JWT_REFRESH_TOKEN_PUBLIC_KEY: str(),
  });
};

export default validateEnv;
