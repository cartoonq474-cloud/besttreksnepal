const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// High-speed in-memory buffer and compression cache
const cache = new Map();

function getCompressed(filePath, rawBuffer, mtimeMs, encoding) {
  const cacheKey = `${filePath}:${mtimeMs}:${encoding}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  let compressedBuffer = null;
  if (encoding === 'br') {
    // Quality 4 delivers ~98% of quality 11 compression in <3ms instead of 1000ms
    compressedBuffer = zlib.brotliCompressSync(rawBuffer, {
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
        [zlib.constants.BROTLI_PARAM_QUALITY]: 4
      }
    });
  } else if (encoding === 'gzip') {
    compressedBuffer = zlib.gzipSync(rawBuffer, { level: 6 });
  }

  if (compressedBuffer) {
    cache.set(cacheKey, compressedBuffer);
  }
  return compressedBuffer;
}

// Pre-warm critical resources so first load is instant
function warmUpCache() {
  const priorityFiles = [
    'index.html',
    'booking.html',
    'about.html',
    'contact.html',
    'treks.html',
    'destinations.html',
    'blog.html',
    'manifest.json',
    'llms.txt',
    'assets/js/main.bundle.js',
    'assets/css/style.css',
    'assets/css/reset.css',
    'assets/css/variables.css',
    'assets/css/typography.css',
    'assets/css/layout.css',
    'assets/css/components.css',
    'assets/css/animations.css',
    'assets/css/utilities.css',
    'assets/css/responsive.css'
  ];

  priorityFiles.forEach(relPath => {
    const fullPath = path.join(PUBLIC_DIR, relPath);
    if (fs.existsSync(fullPath)) {
      try {
        const stats = fs.statSync(fullPath);
        const data = fs.readFileSync(fullPath);
        getCompressed(fullPath, data, stats.mtimeMs, 'br');
        getCompressed(fullPath, data, stats.mtimeMs, 'gzip');
      } catch (e) {}
    }
  });
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  if (!path.extname(reqPath)) {
    if (fs.existsSync(path.join(PUBLIC_DIR, `${reqPath}.html`))) {
      reqPath = `${reqPath}.html`;
    } else if (fs.existsSync(path.join(PUBLIC_DIR, reqPath, 'index.html'))) {
      reqPath = path.join(reqPath, 'index.html');
    }
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      return res.end('<h1>404 Not Found</h1>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Headers
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    };

    // Cache-Control: 1 year for static assets; short revalidate for HTML
    if (ext === '.html') {
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    }

    // ETag & Last-Modified
    const etag = `"${stats.size.toString(16)}-${stats.mtimeMs.toString(16)}"`;
    headers['ETag'] = etag;
    headers['Last-Modified'] = stats.mtime.toUTCString();

    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, headers);
      return res.end();
    }

    const isCompressible = ext === '.html' || ext === '.css' || ext === '.js' || ext === '.svg' || ext === '.json' || ext === '.txt' || ext === '.xml';
    const acceptEncoding = req.headers['accept-encoding'] || '';

    if (isCompressible && stats.size < 5 * 1024 * 1024) {
      // Memory-cached fast path
      fs.readFile(filePath, (readErr, data) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
          return res.end('Internal Server Error');
        }

        // For local dev requests, adapt canonical and absolute URLs to current host
        let responseData = data;
        const host = req.headers.host || 'localhost:3000';
        if (ext === '.html' && (host.startsWith('localhost') || host.startsWith('127.0.0.1'))) {
          let htmlStr = data.toString('utf8');
          htmlStr = htmlStr.replace(/https:\/\/besttreksnepal\.com/g, `http://${host}`);
          responseData = Buffer.from(htmlStr, 'utf8');
        }

        if (/\bbr\b/.test(acceptEncoding)) {
          const brBuffer = (responseData === data) 
            ? getCompressed(filePath, data, stats.mtimeMs, 'br')
            : zlib.brotliCompressSync(responseData, { params: { [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT, [zlib.constants.BROTLI_PARAM_QUALITY]: 4 } });
          headers['Content-Encoding'] = 'br';
          headers['Content-Length'] = brBuffer.length;
          res.writeHead(200, headers);
          return res.end(brBuffer);
        } else if (/\bgzip\b/.test(acceptEncoding)) {
          const gzBuffer = (responseData === data)
            ? getCompressed(filePath, data, stats.mtimeMs, 'gzip')
            : zlib.gzipSync(responseData, { level: 6 });
          headers['Content-Encoding'] = 'gzip';
          headers['Content-Length'] = gzBuffer.length;
          res.writeHead(200, headers);
          return res.end(gzBuffer);
        } else {
          headers['Content-Length'] = responseData.length;
          res.writeHead(200, headers);
          return res.end(responseData);
        }
      });
    } else {
      // Large file or binary image stream
      headers['Content-Length'] = stats.size;
      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

warmUpCache();

server.listen(PORT, () => {
  console.log(`High-performance static server running at http://localhost:${PORT}`);
});
