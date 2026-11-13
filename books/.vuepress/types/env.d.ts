declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      GITHUB_REPOSITORY?: `${string}/${string}`
    }
  }
}

export {}
