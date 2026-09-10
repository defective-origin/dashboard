import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Dashboards and widgets',
        short_name: 'Dashboards',
        description: 'App helps to create widgets and dashboards which helps monitor data',
        start_url: '.',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // only for gh pages
  base: process.env.NODE_ENV === 'production' ? '/dashboard/' : './',
  test: {
    // Defines global variables like 'describe', 'test', and 'expect' so they don't need to be explicitly imported in every test file
    globals: true,

    // Runs each test file in an isolated VM context while reusing worker threads to avoid recreating heavy DOM environments from scratch
    pool: 'vmThreads',

    // Persists transformed code to the file system, significantly speeding up subsequent test runs by skipping recompilation of unchanged files
    fsModuleCache: true,

    // Simulates a browser environment in Node.js, providing essential web APIs like 'window' and 'document' for React component testing
    environment: 'jsdom',

    // Path to a configuration file that runs custom setup logic (e.g., configuring testing libraries, global mocks) before executing the test suite
    setupFiles: 'src/tests/vitest.setup.ts',

    // clear mocks before each tests
    clearMocks: true,
    // mockReset: true,
  },
  // it fix issue when build removes
  // :global and :root styles written in component styles
  build: {
    rollupOptions: {
      treeshake: false,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // allows to remove import from each .scss file
        additionalData: `
        @use "/src/theme" as *;
      `,
      },
    },
  },
})
