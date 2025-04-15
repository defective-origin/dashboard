import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
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
  // only for gh pages
  base: process.env.NODE_ENV === 'production' ? '/dashboard/' : './',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup.ts',
  },
  // it fix issue when build removes
  // :global and :root styles written in component styles
  build: {
    rollupOptions: {
      treeshake: false,
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // allows to remove import from each .scss file
  //       additionalData: '@import "/src/theme";',
  //     },
  //   },
  // },
})
// alias config vite https://www.youtube.com/watch?v=ic-P67jinhw
