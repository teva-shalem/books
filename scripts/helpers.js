import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

export const exists = filePath => fs.access(filePath)
  .then(() => true).catch(() => false)

export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const distDir = path.resolve(__dirname, '../dist')

export const run = async(task, errorMessage) => {
  try {
    if (!await exists(distDir)) {
      throw new Error(`Build folder not found at ${distDir}. Run "npm run build" first.`)
    }

    await task()
  } catch (error) {
    console.error(errorMessage, error.message)
    process.exitCode = 1
  }
}
