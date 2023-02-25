/** @type {import('jest').Config} */
const config = {
  displayName: {
    color: 'blue',
    name: 'types',
  },
  runner: 'jest-runner-tsd',
  testMatch: ['**/__typetests__/*.test.ts']
};

module.exports = config;
