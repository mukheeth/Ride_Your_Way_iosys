import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist', 'index.html');
const html = readFileSync(distPath, 'utf-8');

// Replace relative asset paths with absolute paths
const fixedHtml = html
  .replace(/src="\.\/assets\//g, 'src="/Ride_Your_Way_iosys/assets/')
  .replace(/href="\.\/assets\//g, 'href="/Ride_Your_Way_iosys/assets/');

writeFileSync(distPath, fixedHtml, 'utf-8');
console.log('✅ Fixed asset paths in index.html');

