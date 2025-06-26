const http = require('http');
const fetchDataFromAPI = require('./fetchData');
const startSocketServer = require('./socketServer');
const runWorkerThread = require('./runWorker');
const executeCommand = require('./runCommand');
const startApplication = require('./app');
const monitorWorkerJob = require('./monitorWorker');

const server = http.createServer((req, res) => {
  res.end("Server is up and running");
});

server.listen(3000, () => {
  console.log("HTTP Server listening on port 3000");

  fetchDataFromAPI('https://jsonplaceholder.typicode.com/posts/1');
  startSocketServer(server);
  runWorkerThread();
  executeCommand();
  startApplication();
  monitorWorkerJob();
});
