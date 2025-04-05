import path from 'path'
import glob from 'glob'

/** Get jest setup file paths by glob regex */
const globPath = (_path: string) => glob.sync(_path).map((file) => path.resolve(file))

// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.ts", ...globPath('./src/**/*.jest.setup.ts')],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@tools(.*)$': '<rootDir>/src/tools$1',
  },
}
