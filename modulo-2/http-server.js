import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'})
    res.end('Welcome to Node.js!')
});

server.listen(3000, () => {
    console.log('Server running at http:localhost:3000');
});