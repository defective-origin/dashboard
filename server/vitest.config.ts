import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import glob from 'fast-glob'
import path from 'path'

// locate all local test initialization files.
const localSetupFiles = glob.sync('./src/**/*.test.setup.ts').map(file => path.resolve(file))

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./vitest.setup.ts', ...localSetupFiles],
    pool: 'forks', // Protection against hanging open handlers in Mongoose
  },
})
