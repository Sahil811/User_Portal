// jest.setup.redis-mock.js
import redisMock from 'redis-mock';

// Mock the redis-mock package for the Redis client
jest.mock('redis', () => ({
  createClient: jest.fn(() => redisMock),
}));
