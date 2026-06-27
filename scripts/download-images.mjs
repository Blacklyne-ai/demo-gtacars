// Download + optimise GTA car gallery images -> public/images/cars/<slug>/NN.webp
// Gallery webp max 1400w q78; first image also -> 00-card.webp 760w for listings.
import { readFileSync, mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
const manifest = JSON.parse(readFileSync('docs/cars-data/_manifest.json', 'utf8'));
const OUT = 'public/images/cars';
const MAX_PER = 7;
const slugs = Object.keys(manifest);
let done = 0;
const report = {};

async function grab(url) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
    } catch {}
    await new Promise((s) => setTimeout(s, 400));
  }
  return null;
}

for (const slug of slugs) {
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });
  const urls = manifest[slug].slice(0, MAX_PER);
  let n = 0;
  const saved = [];
  for (const url of urls) {
    const out = join(dir, String(n).padStart(2, '0') + '.webp');
    if (existsSync(out)) { saved.push(out); n++; continue; }
    const buf = await grab(url);
    if (!buf) continue;
    try {
      await sharp(buf).rotate().resize(1400, 1000, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 78 }).toFile(out);
      if (n === 0) {
        await sharp(buf).rotate().resize(760, 540, { fit: 'cover', position: 'centre' })
          .webp({ quality: 74 }).toFile(join(dir, '00-card.webp'));
      }
      saved.push(out); n++;
    } catch (e) { /* skip bad image */ }
  }
  report[slug] = n;
  done++;
  console.log(`[${done}/${slugs.length}] ${slug.slice(0, 48)} -> ${n} imgs`);
}
writeFileSync('docs/cars-data/_imgcount.json', JSON.stringify(report, null, 2));
console.log('IMAGE DOWNLOAD COMPLETE');
