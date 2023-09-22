module.exports =  {
    clearMocks: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/main/**',
      '!<rootDir>/src/configuration/**'],
    coverageDirectory: "coverage",
    // coverageProvider: "v8",
    roots: [
      "<rootDir>/tests"
    ],
    testEnvironment: "node",
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
      '@/tests/(.*)': '<rootDir>/tests/$1',
      '@/(.*)': '<rootDir>/src/$1'
    }
  };