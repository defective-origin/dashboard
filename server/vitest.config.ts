import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import glob from 'fast-glob'
import path from 'path'

// locate all local test initialization files.
const localSetupFiles = glob.sync('./src/**/*.test.setup.ts').map(file => path.resolve(file))

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // Defines global variables like 'describe', 'test', and 'expect' so they don't need to be explicitly imported in every test file
    globals: true,

    // Uses Node.js environment without browser emulation, which is fast and lightweight by default
    environment: 'node',

    // Paths to files that run custom setup logic before executing the test suite
    setupFiles: ['./vitest.setup.ts', ...localSetupFiles],

    // Spawns each test file in a separate child process; required here to safely isolate Mongoose connections and handle unclosed resources
    pool: 'forks',

    // Disables per-file process isolation, reusing workers across multiple files to save startup time
    isolate: false,

    // Persists transformed modules on disk to avoid recompiling TypeScript/ESM files on every test run
    fsModuleCache: true,

    // Runs tests inside a single file sequentially if they share a database connection, preventing concurrent write conflicts
    fileParallelism: true,

    // Limits the maximum number of worker processes to prevent overloading the database with too many concurrent connections
    maxWorkers: 4,
  },
})
