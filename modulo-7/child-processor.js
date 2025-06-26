const { exec } = require('child_process');

function executeCommand() {
  exec('node -v', (err, stdout, stderr) => {
    if (err) return console.error(`Command error: ${stderr}`);
    console.log(`Command output: ${stdout}`);
  });
}

module.exports = executeCommand;
