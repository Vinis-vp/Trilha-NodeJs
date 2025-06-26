const logger = require('./logger');

function startApplication() {
  logger.info("Application started successfully");
  try {
    throw new Error("Simulated failure");
  } catch (err) {
    logger.error(`Captured error: ${err.message}`);
  }
}

module.exports = startApplication;
