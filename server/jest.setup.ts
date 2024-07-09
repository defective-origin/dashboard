/* eslint-disable @typescript-eslint/no-empty-function */

// Turn off console messages
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
  // jest.spyOn(console, 'error').mockImplementation(() => {}) // commented for debugging
})
