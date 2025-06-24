import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'nonexistent.txt');

try {
  const content = await readFile(filePath, 'utf8');
  console.log('File content:', content);
} catch (error) {
  console.error('Erro to access file:', error.message);
}