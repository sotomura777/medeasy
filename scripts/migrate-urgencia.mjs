import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const HTML_PATH = join(ROOT, 'docs', 'tratamento_urgencia-3.html');
const OUT_DIR = join(ROOT, 'src', 'content', 'urgencia', 'patologias');
const ABBREV_PATH = join(ROOT, 'src', 'content', 'urgencia', 'abreviaturas.json');

// ── 1. Extract patologias array ──
const html = readFileSync(HTML_PATH, 'utf-8');
const startMarker = 'const patologias = [';
const endMarker = ']; // fim patologias';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) throw new Error('Could not find patologias array');

const arraySource = html.slice(startIdx + 'const patologias = '.length, endIdx + 1);
const patologias = new Function(`return ${arraySource}`)();
console.log(`Extracted ${patologias.length} patologias`);

// ── 2. Normalize IDs ──
function normalizeId(id) {
  return id
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .toLowerCase();
}

// ── 3. Write individual JSON files ──
mkdirSync(OUT_DIR, { recursive: true });
const manifest = [];

for (const p of patologias) {
  const id = normalizeId(p.id);
  const entry = {
    id,
    titulo: p.titulo,
    icone: p.icone,
    tags: p.tags,
    tabs: p.tabs.map(t => ({
      id: t.id,
      label: t.label,
      html: t.html.trim(),
    })),
  };

  const filename = `${id}.json`;
  writeFileSync(join(OUT_DIR, filename), JSON.stringify(entry, null, 2), 'utf-8');
  manifest.push({ id, titulo: p.titulo, filename });
  console.log(`  ✓ ${filename} (${p.tabs.length} tabs)`);
}

// ── 4. Extract abbreviations from HTML ──
const abbrevs = [];
let currentSection = '';
const abbrevRegex = /<div class="abbrev-(?:section-title|row) abbrev-item"[^>]*>([^]*?)<\/div>/g;
let match;
while ((match = abbrevRegex.exec(html)) !== null) {
  const block = match[0];
  if (block.includes('abbrev-section-title')) {
    const textMatch = block.match(/>([^<]+)<\/div>$/);
    if (textMatch) currentSection = textMatch[1].trim();
  } else {
    const keyMatch = block.match(/<span class="abbrev-key">([^<]+)<\/span>/);
    const valMatch = block.match(/<span class="abbrev-val">([^]*?)<\/span>/);
    if (keyMatch && valMatch) {
      abbrevs.push({
        sigla: keyMatch[1].trim(),
        significado: valMatch[1].trim().replace(/<[^>]+>/g, ''),
        seccao: currentSection,
      });
    }
  }
}

writeFileSync(ABBREV_PATH, JSON.stringify(abbrevs, null, 2), 'utf-8');
console.log(`\nExtracted ${abbrevs.length} abreviaturas across sections`);

// ── 5. Generate index.ts ──
const imports = manifest
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(m => `import ${camelCase(m.id)} from './patologias/${m.filename}';`)
  .join('\n');

const exports = manifest
  .sort((a, b) => a.id.localeCompare(b.id))
  .map(m => `  ${camelCase(m.id)},`)
  .join('\n');

const indexTs = `import type { Patologia, Abreviatura } from '../schema';
import abreviaturas from './abreviaturas.json';

${imports}

export const patologias = [
${exports}
] as Patologia[];

export { abreviaturas };
export type { Abreviatura };
`;

writeFileSync(join(ROOT, 'src', 'content', 'urgencia', 'index.ts'), indexTs, 'utf-8');
console.log(`\nGenerated index.ts with ${manifest.length} imports`);

// ── Helpers ──
function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}
