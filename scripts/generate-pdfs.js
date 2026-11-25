import http from 'node:http'
import path from 'node:path'
import {once} from 'node:events'
import {constants} from 'node:fs'
import fs from 'node:fs/promises'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'
import {PDFDocument} from 'pdf-lib'
import {distDir, exists, run} from './helpers.js'

const IGNORED_DIRS = ['assets', 'images', 'pdfs']
const STATIC_PDF_DIR = path.resolve(distDir, '../books/.vuepress/public/pdfs')

const findBookPages = async() => {
  const entries = await fs.readdir(distDir, {withFileTypes: true})
  const directories = entries.filter(entry => entry.isDirectory() && !IGNORED_DIRS.includes(entry.name.toLowerCase()))
  const pages = await Promise.all(directories.map(async({name}) => {
    if (await exists(path.join(distDir, name, 'index.html'))) return name
    return null
  }))
  return pages.filter(Boolean)
}

const copyStaticPdfs = async(outputDir) => {
  if (!await exists(STATIC_PDF_DIR)) return
  const pdfs = await fs.readdir(STATIC_PDF_DIR, {withFileTypes: true})
  await Promise.all(pdfs.map(({name}) => fs.copyFile(
    path.join(STATIC_PDF_DIR, name),
    path.join(outputDir, name),
    constants.COPYFILE_EXCL,
  )))
}

const PORT = 5050
const PAGE_TIMEOUT_MS = 60000

const renderPage = async(browser, url, outputPath) => {
  const page = await browser.newPage()
  try {
    await page.setViewport({width: 1200, height: 800})
    await page.goto(url, {waitUntil: 'networkidle2', timeout: PAGE_TIMEOUT_MS})
    return await page.pdf({
      path           : outputPath,
      format         : 'A5',
      printBackground: true,
      margin         : {top: '0px', bottom: '0px', left: '0px', right: '0px'},
      timeout        : PAGE_TIMEOUT_MS,
    })
  } finally {
    await page.close()
  }
}

const generateBooksPdfs = async(pages, outputDir) => {
  const base = process.env.GITHUB_REPOSITORY?.endsWith('/books-forever') ? '/books-forever' : ''
  const server = http.createServer((req, res) => {
    if (base && req.url.startsWith(`${base}/`))
      req.url = req.url.replace(base, '')
    return handler(req, res, {public: distDir})
  })
  server.listen(PORT, '127.0.0.1')
  await once(server, 'listening')
  try {
    const origin = `http://127.0.0.1:${server.address().port}${base}`
    const browser = await puppeteer.launch({
      headless: 'new',
      args    : ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    try {
      await Promise.all(pages.map(async(name) => {
        const outputPath = path.join(outputDir, `${name}.pdf`)
        await renderPage(browser, `${origin}/${name}/`, outputPath)
        console.log(`   ✔ Saved: ${name}.pdf`)
      }))
      return await renderPage(browser, `${origin}/`)
    } finally {
      await browser.close()
    }
  } finally {
    await new Promise((resolve) => { server.close(resolve) })
  }
}

const BOOK_ORDER = [
  // 'intro',
  'derech-hapeima',
  'sipur-hayahhid',
  'sod-haiibur',
  'sefer-yetzira',
  'composition-book',
  'mishvaot-hapeima',
  'rosetta-stone',
  'slideshow',
]

const generateWebsitePdf = async(outputDir, books) => {
  const collection = await PDFDocument.create()
  const append = async(bytes) => {
    const book = await PDFDocument.load(bytes)
    const pages = await collection.copyPages(book, book.getPageIndices())
    pages.forEach(page => collection.addPage(page))
  }

  await BOOK_ORDER.reduce(async(previous, name) => {
    await previous
    await append(await fs.readFile(path.join(outputDir, `${name}.pdf`)))
  }, append(books))
  await fs.writeFile(path.join(outputDir, 'tevadynamica.pdf'), await collection.save())
}

const buildPdfs = async() => {
  const outputDir = path.join(distDir, 'pdfs')
  const pages = await findBookPages()

  await fs.rm(outputDir, {recursive: true, force: true})
  await fs.mkdir(outputDir)
  const books = await generateBooksPdfs(pages, outputDir)
  await generateWebsitePdf(outputDir, books)
  await copyStaticPdfs(outputDir)
  console.log('✅ Individual and combined PDFs successfully generated!')
}

run(buildPdfs, '❌ Error generating PDF:')
