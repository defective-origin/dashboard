import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // only for gh pages
  base: '/dashboard/',
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
})
// alias config vite https://www.youtube.com/watch?v=ic-P67jinhw
