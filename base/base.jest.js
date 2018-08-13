module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
      "**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/bin/**",
      "!**/coverage/**",
      "!**/index.d.ts",
    ],
    coverageDirectory: "coverage",
    globals: {
      "ts-jest": {
        "tsConfigFile": "tsconfig.json"
      }
    },
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ],
    modulePaths: ["<rootDir>/src/"],
    testEnvironment: "node",
    testMatch: [
      "**/__tests__/*.test.+(ts|tsx)"
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
  };
  