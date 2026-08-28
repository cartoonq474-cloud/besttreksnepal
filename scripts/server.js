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
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

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
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
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

    // Cache-Control: 1 year for static assets (images, CSS, JS, fonts)
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

    const acceptEncoding = req.headers['accept-encoding'] || '';
    const readStream = fs.createReadStream(filePath);

    if (/\bbr\b/.test(acceptEncoding) && (ext === '.html' || ext === '.css' || ext === '.js' || ext === '.svg' || ext === '.json')) {
      headers['Content-Encoding'] = 'br';
      res.writeHead(200, headers);
      readStream.pipe(zlib.createBrotliCompress()).pipe(res);
    } else if (/\bgzip\b/.test(acceptEncoding) && (ext === '.html' || ext === '.css' || ext === '.js' || ext === '.svg' || ext === '.json')) {
      headers['Content-Encoding'] = 'gzip';
      res.writeHead(200, headers);
      readStream.pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, headers);
      readStream.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`High-performance static server running at http://localhost:${PORT}`);
});
