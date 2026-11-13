import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs/promises'
import path from 'node:path'
import AdmZip from 'adm-zip'

const exec = promisify(execFile)

const CACHE_DIR = path.resolve('.cache/sws')
const DIST_DIR = path.resolve('dist')
const OUTPUT_ZIP = path.resolve('dist/offline-tevadynamica.zip')

const SWS_EXE_PATH = path.join(CACHE_DIR, 'static-web-server.exe')
const SWS_MAC_ARM_PATH = path.join(CACHE_DIR, 'static-web-server-macos-arm64')
const SWS_MAC_X64_PATH = path.join(CACHE_DIR, 'static-web-server-macos-x64')

const ASSETS = [
  { suffix: 'x86_64-pc-windows-msvc.zip', output: SWS_EXE_PATH, type: 'zip' },
  { suffix: 'aarch64-apple-darwin.tar.gz', output: SWS_MAC_ARM_PATH, type: 'tar' },
  { suffix: 'x86_64-apple-darwin.tar.gz', output: SWS_MAC_X64_PATH, type: 'tar' },
]

const API_URL = 'https://api.github.com/repos/static-web-server/static-web-server/releases/latest'

const START_BAT = `@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:8080"
static-web-server.exe -p 8080 -d "./dist" --page-fallback "./dist/404.html"
`

const START_MAC = `#!/bin/bash
cd "$(dirname "$0")"

if [[ "$(uname -m)" == "arm64" ]]; then
  SERVER="./static-web-server-macos-arm64"
else
  SERVER="./static-web-server-macos-x64"
fi

chmod +x "$SERVER"
open "http://127.0.0.1:8080"
"$SERVER" -p 8080 -d "./dist" --page-fallback "./dist/404.html"
`

const exists = async (filePath) =>
  fs.access(filePath).then(() => true).catch(() => false)

const findBinary = async (directory, filename) => {
  const entries = await fs.readdir(directory, { withFileTypes: true })

  const directMatch = entries.find((entry) => entry.isFile() && entry.name === filename)

  if (directMatch) {
    return path.join(directory, directMatch.name)
  }

  const subdirectories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(directory, entry.name))

  const results = await Promise.all(
    subdirectories.map((subdirectory) => findBinary(subdirectory, filename)),
  )

  return results.find(Boolean) ?? null
}

const extractZip = async (archivePath, output) => {
  const archive = new AdmZip(await fs.readFile(archivePath))

  await fs.writeFile(output, archive.getEntries().find(({ entryName }) =>
    entryName.endsWith('static-web-server.exe'),
  ).getData())
}

const extractTar = async (archivePath, output) => {
  const extractDir = `${output}.extract`

  await fs.mkdir(extractDir, { recursive: true })

  await exec('tar', [
    '-xzf',
    path.relative(process.cwd(), archivePath),
    '-C',
    path.relative(process.cwd(), extractDir),
  ], { cwd: process.cwd() })

  await fs.copyFile(await findBinary(extractDir, 'static-web-server'), output)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  await fs.chmod(output, 0o755)
  await fs.rm(extractDir, { recursive: true, force: true })
}

const downloadLatestSws = async () => {
  if (await Promise.all(ASSETS.map(({ output }) => exists(output))).then(
    (results) => results.every(Boolean),
  )) {
    console.log('Using cached static-web-server binaries...')
    return
  }

  console.log(`Fetching latest release metadata from ${API_URL}...`)

  const { stdout } = await exec('curl', ['-fsSL', API_URL])
  const {assets: releaseAssets, tag_name: releaseTag} = JSON.parse(stdout)

  await fs.mkdir(CACHE_DIR, { recursive: true })

  await Promise.all(ASSETS.map(async ({ suffix, output, type }) => {
    const {name: assetName, browser_download_url: assetUrl} = 
      releaseAssets.find(({ name }) => name.endsWith(suffix))

    const archivePath = path.join(CACHE_DIR, assetName)

    console.log(`Downloading ${assetName} (${releaseTag})...`)

    await exec('curl', ['-fsSL', assetUrl, '-o', archivePath])

    if (type === 'zip') {
      await extractZip(archivePath, output)
    } else {
      await extractTar(archivePath, output)
    }

    await fs.unlink(archivePath)
  }))

  console.log(`Downloaded static-web-server binaries (${releaseTag})`)
}

const buildOfflineZip = async () => {
  await downloadLatestSws()

  if (await exists(OUTPUT_ZIP)) {
    await fs.unlink(OUTPUT_ZIP)
  }

  console.log('Creating offline zip bundle...')

  const zip = new AdmZip()
  zip.addLocalFolder(DIST_DIR, 'dist')
  zip.addFile('static-web-server.exe', await fs.readFile(SWS_EXE_PATH))
  zip.addFile('static-web-server-macos-arm64', await fs.readFile(SWS_MAC_ARM_PATH))
  zip.addFile('static-web-server-macos-x64', await fs.readFile(SWS_MAC_X64_PATH))
  zip.addFile('טבעדינמיקה windows.bat', Buffer.from(START_BAT.replace(/\r?\n/g, '\r\n'), 'utf8'))
  zip.addFile('טבעדינמיקה mac.command', Buffer.from(START_MAC, 'utf8'))

  await new Promise((resolve, reject) => {
    zip.writeZip(OUTPUT_ZIP, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })

  console.log(`Done! Created ${OUTPUT_ZIP}`)
}

const main = async () => {
  try {
    if (!(await exists(DIST_DIR)))
      throw new Error(`Build folder not found at ${DIST_DIR}. Run "npm run build" first.`)

    await buildOfflineZip()
  } catch (error) {
    console.error('ERROR:', error.message)
    process.exitCode = 1
  }
}

main()