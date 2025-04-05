/* eslint-disable @typescript-eslint/no-empty-function */

// TODO: migrate to vitest https://vitest.dev/guide/migration.html#jest

// setup mock Storage
jest.mock('async_hooks', () => ({
  ...jest.requireActual('async_hooks'),
  AsyncLocalStorage: jest.fn(() => ({
    run: jest.fn((store, callback) => callback()),
    enterWith: jest.fn(),
    getStore: jest.fn(() => ({
      user: { id: '67f9eb0a28ed5ebc288e7923' }
    })),
  })),
}));

// Turn off console messages
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  // jest.spyOn(console, 'error').mockImplementation(() => {}) // commented for debugging
})
