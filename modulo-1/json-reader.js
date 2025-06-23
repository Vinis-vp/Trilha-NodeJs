import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'user.json');

try{
    const data = await readFile(filePath, 'utf8');
    const user = JSON.parse(data);
    console.log('User information:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Age: ${user.age}`);
} catch (err) {
    console.error('Error reading user file:', err.message);
}