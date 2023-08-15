/**
 * This module initializes the TypeORM data source using configuration settings
 * from the 'config' package and connects to a PostgreSQL database.
 * It creates a DataSource instance and configures it with the necessary parameters.
 * The DataSource instance can then be used throughout the application to interact with the database.
 * @module data-source
 */

// Load environment variables from a '.env' file if present
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: require('find-config')('.env') });

// Import required modules
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';

// Retrieve PostgreSQL configuration settings from the 'config' package
const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

// Create and export a DataSource instance
export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres', // Specifies the database type
  synchronize: false, // Disable automatic database schema synchronization
  logging: false, // Disable database query logging
  entities: ['src/entities/**/*.entity{.ts,.js}'], // Specify entity classes
  migrations: ['src/migrations/**/*{.ts,.js}'], // Specify migration files
  subscribers: ['src/subscribers/**/*{.ts,.js}'], // Specify subscriber classes
});
