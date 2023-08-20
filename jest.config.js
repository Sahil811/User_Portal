/* eslint-disable no-undef */
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.redis-mock.ts'],
  //   testMatch: ['**/tests/**/*.test?.ts'],
};
