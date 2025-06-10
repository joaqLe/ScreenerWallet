module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
}
