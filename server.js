const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Clean trailing slash
  if (url !== '/' && url.endsWith('/')) url = url.slice(0, -1);

  // Map routes to files
  let filePath;
  if (url === '/') {
    filePath = path.join(PUBLIC, 'index.html');
  } else if (/^\/[1-4]$/.test(url)) {
    filePath = path.join(PUBLIC, url, 'index.html');
  } else {
    filePath = path.join(PUBLIC, url);
  }

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('<h1>404</h1>');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  Dashboard running at http://localhost:${PORT}\n`);
  console.log(`  /1  →  NEXUS   (Cyberpunk Terminal)`);
  console.log(`  /2  →  PRISM   (Ethereal Glass)`);
  console.log(`  /3  →  DISPATCH (Editorial Broadsheet)`);
  console.log(`  /4  →  VOID    (Dark Luxury)\n`);
});
