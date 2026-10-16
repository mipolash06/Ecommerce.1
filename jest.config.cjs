/** @type {import('jest').Config} */
module.exports = {
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/unit/__mocks__/styleMock.js'
  },
  collectCoverageFrom: [
    'backend/src/utils/**/*.js',
    'frontend/src/utils/helpers.js'
  ],
  coverageDirectory: 'tests/coverage',
  verbose: true
};
