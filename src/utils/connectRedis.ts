/**
 * This module sets up a connection to a Redis server using the `redis` library.
 * It connects to the Redis server specified by the `redisUrl` and provides a Redis client instance.
 * The `connectRedis` function handles the connection and retry logic.
 * Once connected, it sets a sample key-value pair in Redis.
 *
 * @module RedisClient
 */

import { createClient } from 'redis';

/**
 * The URL of the Redis server.
 * Change this URL as needed to match your Redis server configuration.
 */
const redisUrl = 'redis://localhost:6379';

/**
 * The Redis client instance.
 */
const redisClient = createClient({
  url: redisUrl,
});

/**
 * Connects to the Redis server and sets a sample key-value pair once connected.
 * If the connection fails, it retries after a delay.
 */
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connected successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    // setTimeout(connectRedis, 5000); // Retry after 5 seconds
  }
};

// Establish the Redis connection
connectRedis();

/**
 * Export the Redis client instance for use in other parts of the application.
 */
export default redisClient;
