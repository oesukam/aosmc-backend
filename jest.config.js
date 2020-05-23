const path = require('path');

module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/database',
  ],
  verbose: true,
  coverageThreshold: {
    global: {
      functions: 0,
      lines: 0,
      statements: -5000,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.{js,ts}?(x)'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
};
