import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
