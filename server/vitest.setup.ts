import { vi, beforeAll } from 'vitest'

// mock AsyncLocalStorage strictly at the top level of the file.
vi.mock('async_hooks', async importOriginal => {
  const original: any = await importOriginal()

  return {
    ...original,
    AsyncLocalStorage: vi.fn(() => ({
      run: vi.fn((store, callback) => callback()),
      enterWith: vi.fn(),
      getStore: vi.fn(() => ({
        user: { id: '67f9eb0a28ed5ebc288e7923' },
      })),
    })),
  }
})

// disable console logs in the `beforeAll` hook.
beforeAll(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  // vi.spyOn(console, 'error').mockImplementation(() => {})
})
