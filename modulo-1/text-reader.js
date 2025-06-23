import { readFile } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pathFile = join(__dirname, 'text.txt');

readFile(pathFile, 'utf8', (error, data) => {
  if (error) {
    console.error('❌ Error to read file:', error.message);
    return;
  }
  console.log('📄 File context:\n');
  console.log(data);
});