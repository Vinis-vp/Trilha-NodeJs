import http from 'http';
import { parse } from 'url';

const server = http.createServer((req, res) => {
    const { pathname } = parse(req.url, true);

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (pathname === '/') {
    res.writeHead(200);
    res.end('Home Page');
  } else if (pathname === '/about') {
    res.writeHead(200);
    res.end('About the project');
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'API working!' }));
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});