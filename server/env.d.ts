declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'e2e'

      API_PORT?: string
      API_NAME: string

      MONGODB_URL: string

      ELASTICSEARCH_SECURITY: boolean
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
