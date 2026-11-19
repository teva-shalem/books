const getGithubRepo = (): string | undefined => {
  return process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
}

export const getBaseUrl = (): `/${string}/` | undefined => {
  return getGithubRepo() === 'books-forever' ? '/books-forever/' : undefined
}
