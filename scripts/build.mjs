import {mkdir,copyFile,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
await mkdir('dist/assets',{recursive:true});
for(const file of ['index.html','styles.css','app.js','catalog.js','trending-catalog.js','open-catalog.js']) await copyFile(file,join('dist',file));
for(const file of await readdir('assets')) {
 if(!file.endsWith('-readme.txt') && (await stat(join('assets',file))).isFile()) await copyFile(join('assets',file),join('dist/assets',file));
}
console.log('Built OpenStore into dist/ — no runtime dependencies.');
