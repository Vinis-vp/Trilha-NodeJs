import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, 'example.txt');

async function createAndReadFile() {
    try{
        await writeFile(filePath, 'Content created with Node.js ESModules!', 'utf8')
        console.log('file created successfully')

        const content = await readFile(filePath, 'utf8');
        console.log('file content: ', content) 
    } catch (error) {
        console.error('Error to manipulate file: ', error.message)
    }
}

createAndReadFile()