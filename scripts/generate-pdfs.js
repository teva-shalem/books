import http from 'node:http'
import handler from 'serve-handler'
import path from 'node:path'
import fs from 'node:fs/promises'
import puppeteer from 'puppeteer'
import {exists, distDir, run} from './helpers.js'

const IGNORED_DIRS = ['assets', 'images', 'pdfs']
const OUTPUT_DIR = path.resolve(distDir, 'pdfs')
const PORT = 5050
const PAGE_TIMEOUT_MS = 60000

const getHtmlFiles = async(directory) => {
  if (!await exists(directory)) return []

  const entries = await fs.readdir(directory, {withFileTypes: true})

  const directories = entries
    .filter(entry => entry.isDirectory() && !IGNORED_DIRS.includes(entry.name.toLowerCase()))

  const results = await Promise.all(directories.map(async({name}) => {
    const indexPath = path.join(directory, name, 'index.html')

    if (!await exists(indexPath)) return null

    return {urlPath: `/${name}/`, relPath: `${name}/index.html`}
  }))

  return results.filter(Boolean)
}

const generatePdf = async(browser, {urlPath, relPath}) => {
  console.log(`⏳ Generating PDF for: ${urlPath}`)

  const page = await browser.newPage()

  try {
    await page.setViewport({width: 1200, height: 800})

    await page.goto(`http://localhost:${PORT}${urlPath}`, {
      waitUntil: 'networkidle2',
      timeout  : PAGE_TIMEOUT_MS,
    })

    // "derech-hapeima/index.html" -> "derech-hapeima.pdf"
    const fileName = relPath
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/, '.pdf')
      .replace(/\.html$/, '.pdf')

    const pdfPath = path.resolve(distDir, 'pdfs', fileName)

    await page.pdf({
      path           : pdfPath,
      format         : 'A5',
      printBackground: true,
      margin         : {
        top   : '0px',
        bottom: '0px',
        left  : '0px',
        right : '0px',
      },
      timeout: PAGE_TIMEOUT_MS,
    })

    console.log(`   ✔ Saved: ${fileName}`)
  } finally {
    await page.close()
  }
}

const generatePdfs = async(browser) => {
  const htmlFiles = await getHtmlFiles(distDir)

  if (await exists(OUTPUT_DIR))
    await fs.unlink(OUTPUT_DIR)
  await fs.mkdir(OUTPUT_DIR, {recursive: true})

  console.log(`📖 Found ${htmlFiles.length} pages to convert to individual PDFs...`)

  await Promise.all(htmlFiles.map(file => generatePdf(browser, file)))

  console.log('✅ All individual page PDFs successfully generated!')
}

const startServer = () => new Promise((resolve, reject) => {
  const server = http.createServer((req, res) =>
    handler(req, res, {public: distDir}))
  server.once('error', reject)
  server.listen(PORT, () => {
    console.log(`🚀 Local static server running at http://localhost:${PORT}`)
    resolve(server)
  })
})

const buildPdfs = async() => {
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args    : ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  await generatePdfs(browser)

  await browser?.close()
  await new Promise((resolve) => { server.close(resolve) })
  console.log('🛑 Local server closed.')
}

run(buildPdfs, '❌ Error generating PDF:')
