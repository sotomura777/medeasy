import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'icons');

const TEAL = '#128A72';
const NAVY = '#0F2340';

async function generateIcon(size, filename, maskable = false) {
  const padding = maskable ? Math.round(size * 0.2) : Math.round(size * 0.1);
  const inner = size - padding * 2;
  const r = Math.round(size * 0.18);
  const crossW = Math.round(inner * 0.14);
  const crossH = Math.round(inner * 0.5);
  const cx = size / 2;
  const cy = size / 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    ${maskable
      ? `<rect width="${size}" height="${size}" fill="${NAVY}"/>`
      : ''
    }
    <rect x="${padding}" y="${padding}" width="${inner}" height="${inner}" rx="${r}" fill="${TEAL}"/>
    <rect x="${cx - crossW / 2}" y="${cy - crossH / 2}" width="${crossW}" height="${crossH}" rx="${crossW * 0.2}" fill="white"/>
    <rect x="${cx - crossH / 2}" y="${cy - crossW / 2}" width="${crossH}" height="${crossW}" rx="${crossW * 0.2}" fill="white"/>
  </svg>`;

  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  writeFileSync(join(OUT, filename), buf);
  console.log(`  ✓ ${filename} (${size}×${size})`);
}

async function generateFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="6" fill="${TEAL}"/>
    <rect x="14" y="8" width="4" height="16" rx="1" fill="white"/>
    <rect x="8" y="14" width="16" height="4" rx="1" fill="white"/>
  </svg>`;
  writeFileSync(join(OUT, 'favicon.svg'), svg);
  console.log('  ✓ favicon.svg');

  const buf = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
  writeFileSync(join(OUT, 'favicon-32.png'), buf);

  const appleBuf = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
      <rect width="180" height="180" fill="${NAVY}"/>
      <rect x="30" y="30" width="120" height="120" rx="24" fill="${TEAL}"/>
      <rect x="82" y="55" width="16" height="70" rx="3" fill="white"/>
      <rect x="55" y="82" width="70" height="16" rx="3" fill="white"/>
    </svg>`
  )).png().toBuffer();
  writeFileSync(join(OUT, 'apple-touch-icon.png'), appleBuf);
  console.log('  ✓ apple-touch-icon.png (180×180)');
}

console.log('Generating PWA icons...');
await generateIcon(192, 'icon-192.png');
await generateIcon(512, 'icon-512.png');
await generateIcon(512, 'icon-512-maskable.png', true);
await generateFavicon();
console.log('Done.');
