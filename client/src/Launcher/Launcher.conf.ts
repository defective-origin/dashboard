export const ENV = {
  MODE: {
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,
    IS_STAGE: import.meta.env.MODE === 'staging',
    IS_TEST: import.meta.env.MODE === 'testing',
  },
  BASE_URL: import.meta.env.BASE_URL,
}
