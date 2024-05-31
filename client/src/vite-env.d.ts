/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  // Only variables with VITE_ prefix will be exposed as import.meta.env.VITE_SOME_KEY to your client source code,
  // but WITHOUT_PREFIX will not.
  // https://vitejs.dev/guide/env-and-mode
  // more env variables...
  readonly VITE_API: string
  readonly VITE_FILE_API: string
}
