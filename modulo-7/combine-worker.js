const { Worker } = require('worker_threads');
const logger = require('./logger');

function monitorWorkerJob() {
  const worker = new Worker('./workerJob.js');
  logger.info("Worker thread started");

  worker.on('message', result => {
    logger.info(`Worker completed with result: ${result}`);
  });

  worker.on('error', err => {
    logger.error(`Worker failed: ${err.message}`);
  });
}

module.exports = monitorWorkerJob;
