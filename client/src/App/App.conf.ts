export const ENV = {
  MODE: {
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
    STAGING: import.meta.env.MODE === 'staging',
    TESTING: import.meta.env.MODE === 'testing',
  },
  SYSTEM: {
    BASE_URL: import.meta.env.BASE_URL,
    API: import.meta.env.VITE_API,
    FILE_API: import.meta.env.VITE_FILE_API,
  },
}
