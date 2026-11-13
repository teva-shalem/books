import http from 'http'
import handler from 'serve-handler'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DIST_DIR = path.resolve(__dirname, '../dist')
const IGNORED_DIRS = ['assets', 'images']
const PORT = 5050
const PAGE_TIMEOUT_MS = 60000

const getHtmlFiles = (dir) => {
  const results = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir)

  list.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!IGNORED_DIRS.includes(file.toLowerCase())) {
        const indexPath = path.join(filePath, 'index.html')

        if (fs.existsSync(indexPath)) {
          const urlPath = `/${file}/`
          const relPath = `${file}/index.html`
          results.push({ urlPath, relPath })
        }
      }
    }
  })

  return results
}

const fail = (err) => {
  console.error(`❌ Error generating PDF: ${err}`)
  process.exit(1)
}

if (!fs.existsSync(DIST_DIR)) {
  fail('Run "npm run build" first')
}

const server = http.createServer((req, res) => {
  return handler(req, res, { public: DIST_DIR })
})

server.listen(PORT, async () => {
  console.log(`🚀 Local static server running at http://localhost:${PORT}`)

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const htmlFiles = getHtmlFiles(DIST_DIR)
    console.log(`📖 Found ${htmlFiles.length} pages to convert to individual PDFs...`)

    await Promise.all(htmlFiles.map(async ({ urlPath, relPath }) => {
      console.log(`⏳ Generating PDF for: ${urlPath}`)

      const page = await browser.newPage()
      await page.setViewport({ width: 1200, height: 800 })
      await page.goto(`http://localhost:${PORT}${urlPath}`, {
        waitUntil: 'networkidle2',
        timeout: PAGE_TIMEOUT_MS,
      })

      // "derech-hapeima/index.html" -> "derech-hapeima.pdf"
      const fileName = relPath
        .replace(/\\/g, '/')
        .replace(/\/index\.html$/, '.pdf')
        .replace(/\.html$/, '.pdf')

      const pdfPath = path.resolve(DIST_DIR, fileName)

      await page.pdf({
        path: pdfPath,
        format: 'A5',
        printBackground: true,
        margin: {
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
        },
        timeout: PAGE_TIMEOUT_MS,
      })

      console.log(`   ✔ Saved: ${fileName}`)
    }))

    console.log('✅ All individual page PDFs successfully generated!')
    await browser.close()
  } catch (err) {
    fail(err)
  } finally {
    server.close(() => {
      console.log('🛑 Local server closed.')
      process.exit(0)
    })
  }
})
