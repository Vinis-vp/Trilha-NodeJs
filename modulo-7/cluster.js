const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  console.log(`Primary ${process.pid} is running with ${cpuCount} workers`);
  for (let i = 0; i < cpuCount; i++) cluster.fork();
} else {
  http.createServer((_, res) => {
    res.end(`Handled by Worker ${process.pid}`);
  }).listen(3001);
  console.log(`Worker ${process.pid} started`);
}
