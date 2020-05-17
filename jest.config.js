module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/server.js',
    'src/app.js',
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
