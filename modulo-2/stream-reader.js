import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'bigfile.txt');

const stream = createReadStream(filePath, {
    encoding: 'utf8',
    highWaterMark: 64 * 1024,
});

const rl = createInterface({
    input: stream,
    crlfDelay: Infinity,
});

let lineCount = 0;

console.log('Starting to read the file')

rl.on('line', (line) => {
    lineCount++;

    if (lineCount <= 5) console.log(`Linha ${lineCount}:`, line);
})

rl.on('close', () => {
    console.log('finished reading. Total lines: ', lineCount)
})