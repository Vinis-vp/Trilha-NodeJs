const { Worker } = require('worker_threads');

function runWorkerThread() {
  const worker = new Worker('./workerJob.js');
  worker.on('message', msg => console.log("Worker result:", msg));
  worker.on('error', err => console.error("Worker error:", err));
}

module.exports = runWorkerThread;
