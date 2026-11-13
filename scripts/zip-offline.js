import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'

const DIST_DIR = path.resolve('dist')
const OUTPUT_ZIP = path.resolve('dist/offline-tevadynamica.zip')
const CACHE_DIR = path.resolve('.cache/sws')
const SWS_EXE_PATH = path.join(CACHE_DIR, 'static-web-server.exe')

const API_HOST = ['api', 'github', 'com'].join('.')
const API_URL = `https://${API_HOST}/repos/static-web-server/static-web-server/releases/latest`

const START_BAT = `@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:8080"
static-web-server.exe -p 8080 -d "./dist" --page-fallback "./dist/404.html"
`

const downloadLatestSws = () => {
  if (fs.existsSync(SWS_EXE_PATH)) {
    console.log('Using cached static-web-server.exe...')
    return SWS_EXE_PATH
  }

  console.log(`Fetching latest release metadata from ${API_URL}...`)
  const jsonRaw = execFileSync(
    'curl',
    ['-fsSL', '-H', 'User-Agent: vuepress-offline-packager', API_URL],
    { encoding: 'utf8' },
  )

  const release = JSON.parse(jsonRaw)
  const asset = release.assets.find((a) =>
    a.name.endsWith('x86_64-pc-windows-msvc.zip'),
  )

  if (!asset) {
    throw new Error(`No Windows x86_64 asset found in release ${release.tag_name}.`)
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true })
  const tempZip = path.join(CACHE_DIR, 'sws-download.zip')
  if (fs.existsSync(tempZip)) fs.unlinkSync(tempZip)

  console.log(`Downloading ${asset.name} (${release.tag_name})...`)
  execFileSync('curl', ['-fsSL', asset.browser_download_url, '-o', tempZip], {
    stdio: 'inherit',
  })

  const downloadedZip = new AdmZip(tempZip)
  const exeEntry = downloadedZip
    .getEntries()
    .find((e) => e.entryName.endsWith('static-web-server.exe'))

  if (!exeEntry) {
    throw new Error('static-web-server.exe not found inside archive.')
  }

  fs.writeFileSync(SWS_EXE_PATH, exeEntry.getData())
  fs.unlinkSync(tempZip)
  console.log(`Extracted static-web-server.exe (${release.tag_name}) to ${SWS_EXE_PATH}`)

  return SWS_EXE_PATH
}

const buildOfflineZip = () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Build folder not found at ${DIST_DIR}. Run your VuePress build first.`)
  }

  const exePath = downloadLatestSws()

  if (fs.existsSync(OUTPUT_ZIP)) fs.unlinkSync(OUTPUT_ZIP)

  console.log('Creating offline zip bundle...')
  const zip = new AdmZip()
  zip.addLocalFolder(DIST_DIR, 'dist')
  zip.addLocalFile(exePath, '')
  zip.addFile('טבעדינמיקה.bat', Buffer.from(START_BAT.replace(/\r?\n/g, '\r\n'), 'utf8'))

  zip.writeZip(OUTPUT_ZIP)
  console.log(`Done! Created ${OUTPUT_ZIP}`)
}

try {
  buildOfflineZip()
} catch (err) {
  console.error('ERROR:', err.message)
  process.exit(1)
}