// docs/cars-data/*.json (raw scrape) -> src/content/cars/*.json (schema-shaped).
// Re-derives marketing brand from the verbatim title (keeps "Range Rover" distinct),
// short card name, body type, and an honest spec-only description. Nothing invented.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'docs/cars-data';
const OUT = 'src/content/cars';
const imgCount = existsSync(join(SRC, '_imgcount.json'))
  ? JSON.parse(readFileSync(join(SRC, '_imgcount.json'), 'utf8')) : {};

// Brand detection — most-specific first; "Range Rover" stays its own make (how buyers filter).
const BRANDS = [
  'Mercedes-Benz', 'Aston Martin', 'Alfa Romeo', 'Range Rover', 'Land Rover', 'Rolls-Royce',
  'Mercedes', 'BMW', 'Porsche', 'Audi', 'Bentley', 'Lamborghini', 'Maserati', 'Ferrari',
  'McLaren', 'Jaguar', 'Cadillac', 'Tesla', 'Lexus', 'Infiniti', 'Genesis', 'Lincoln',
  'Volkswagen', 'Volvo', 'Jeep', 'Nissan', 'Toyota', 'Chevrolet', 'Dodge', 'GMC', 'Mini',
  'Jetour', 'Geely', 'Lotus', 'Ford', 'Honda', 'Mazda', 'Mitsubishi', 'Peugeot',
];
const detectBrand = (title) => {
  for (const b of BRANDS) if (new RegExp('\\b' + b.replace('-', '[- ]') + '\\b', 'i').test(title)) {
    return b === 'Mercedes' ? 'Mercedes-Benz' : b;
  }
  return 'Other';
};

let written = 0, skipped = 0;
for (const f of readdirSync(SRC)) {
  if (!f.endsWith('.json') || f.startsWith('_')) continue;
  const d = JSON.parse(readFileSync(join(SRC, f), 'utf8'));
  const slug = d.slug;
  const nImg = imgCount[slug] || 0;
  if (!d.price || nImg === 0) { skipped++; continue; }

  const brand = detectBrand(d.title);
  // card name: first comma segment of title, leading year stripped
  const nameSeg = d.title.split(',')[0].trim().replace(/^(?:19|20)\d{2}\s+/, '').trim();
  const name = nameSeg.replace(/\s+/g, ' ');
  const model = name.replace(new RegExp('^' + brand.replace('-', '[- ]'), 'i'), '').replace(/^[- ]+/, '').trim();

  // honest spec-only description (only when source has none)
  const km = d.mileageKm ? d.mileageKm.toLocaleString('en-US') + ' km' : null;
  const bits = [
    d.year ? `${d.year} ${name}` : name,
    d.regional ? `${d.regional} specifications` : null,
    km, d.transmission, d.horsepower,
    d.serviceHistory && /full/i.test(d.serviceHistory) ? d.serviceHistory : null,
  ].filter(Boolean);
  const description = (d.description && d.description.length > 30)
    ? d.description
    : bits.join(' · ') + '. Inspected and available now at our Dubai showroom.';

  const images = [];
  for (let i = 0; i < nImg; i++) images.push(`/images/cars/${slug}/${String(i).padStart(2, '0')}.webp`);

  const out = {
    slug,
    title: d.title,
    name,
    brand,
    model,
    year: d.year ?? null,
    bodyType: (d.bodyType || 'Other').trim(),
    priceAed: d.price ?? null,
    monthlyAed: d.monthly ?? null,
    specs: {
      mileageKm: d.mileageKm ?? null,
      transmission: d.transmission || undefined,
      cylinders: d.cylinders || undefined,
      horsepower: d.horsepower || undefined,
      fuelType: d.fuelType || undefined,
      colour: d.colour || undefined,
      doors: d.doors || undefined,
      regional: d.regional || undefined,
      serviceHistory: d.serviceHistory || undefined,
      serviceContract: d.serviceContract || undefined,
      warranty: d.warranty || undefined,
    },
    description,
    images,
    cardImage: `/images/cars/${slug}/00-card.webp`,
    sold: false,
    sourceUrl: d.sourceUrl,
  };
  writeFileSync(join(OUT, slug + '.json'), JSON.stringify(out, null, 2));
  written++;
}
console.log(`transform: ${written} cars written, ${skipped} skipped (no price/img)`);
