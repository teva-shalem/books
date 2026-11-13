import 'markdown-it'
declare module 'markdown-it' {
  export interface Token {
    nesting: number
    [key: string]: unknown
  }
}
