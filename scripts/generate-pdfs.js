import http from 'http';
import handler from 'serve-handler';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DIST_DIR = path.resolve(__dirname, '../dist');
const IGNORED_DIRS = ['assets', 'images'];
const PORT = 5050;

// Recursively find all generated HTML pages while skipping asset folders
function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip asset and resource folders
      if (!IGNORED_DIRS.includes(file.toLowerCase())) {
        const indexPath = path.join(filePath, 'index.html');
        // Check if a single-level page folder has an index.html
        if (fs.existsSync(indexPath)) {
          const urlPath = `/${file}/`;
          const relPath = `${file}/index.html`;
          results.push({ urlPath, relPath });
        }
      }
    }
  });

  return results;
}

function fail(err) {
  console.error(`❌ Error generating PDF: ${err}`);
  process.exit(1);
}

if (!fs.existsSync(DIST_DIR)) {
  fail('Run "npm run build" first');
}

const server = http.createServer((req, res) => {
  return handler(req, res, { public: DIST_DIR });
});

server.listen(PORT, async () => {
  console.log(`🚀 Local static server running at http://localhost:${PORT}`);

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport to standard print/desktop width
    await page.setViewport({ width: 1200, height: 800 });

    const htmlFiles = getHtmlFiles(DIST_DIR);
    console.log(`📖 Found ${htmlFiles.length} pages to convert to individual PDFs...`);

    // Ensure target output directory exists in public
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }

    for (const { urlPath, relPath } of htmlFiles) {
      console.log(`⏳ Generating PDF for: ${urlPath}`);

      await page.goto(`http://localhost:${PORT}${urlPath}`, {
        waitUntil: 'networkidle0',
      });

      // Safety wait to ensure DOM layout and components settle
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));

      // Flatten directory paths into clean filenames (e.g. "derech-hapeima/index.html" -> "derech-hapeima.pdf")
      const fileName = relPath
        .replace(/\\/g, '/')
        .replace(/\/index\.html$/, '.pdf')
        .replace(/\.html$/, '.pdf');

      const pdfPath = path.resolve(DIST_DIR, fileName);

      // Generate the PDF
      await page.pdf({
        path: pdfPath,
        format: 'A5',
        printBackground: true,
        margin: {
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px'
        }
      });

      console.log(`   ✔ Saved: ${fileName}`);
    }

    console.log('✅ All individual page PDFs successfully generated!');
    await browser.close();
  } catch (err) {
    fail(err);
  } finally {
    // Shut down the temporary server
    server.close(() => {
      console.log('🛑 Local server closed.');
      process.exit(0);
    });
  }
});
