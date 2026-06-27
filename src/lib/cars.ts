import { getCollection, type CollectionEntry } from 'astro:content';

export type Car = CollectionEntry<'cars'>['data'];

export const fmtAED = (n: number | null | undefined) =>
  n == null ? 'Price on request' : 'AED ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);

export const fmtKm = (n: number | null | undefined) =>
  n == null ? null : new Intl.NumberFormat('en-US').format(n) + ' km';

// Whole inventory, available first, then by price desc (flagship first).
export async function getCars(): Promise<Car[]> {
  const entries = await getCollection('cars');
  return entries
    .map((e) => e.data)
    .sort((a, b) => {
      if (a.sold !== b.sold) return a.sold ? 1 : -1;
      return (b.priceAed ?? 0) - (a.priceAed ?? 0);
    });
}

export const liveCars = (cars: Car[]) => cars.filter((c) => !c.sold);
export const soldCars = (cars: Car[]) => cars.filter((c) => c.sold);

export function brandCounts(cars: Car[]) {
  const m = new Map<string, number>();
  for (const c of cars) m.set(c.brand, (m.get(c.brand) || 0) + 1);
  return m;
}
export function bodyCounts(cars: Car[]) {
  const m = new Map<string, number>();
  for (const c of cars) m.set(c.bodyType, (m.get(c.bodyType) || 0) + 1);
  return m;
}

// Brands present, by count desc.
export function activeBrands(cars: Car[]): string[] {
  return [...brandCounts(cars).entries()].sort((a, b) => b[1] - a[1]).map(([b]) => b);
}

// "Similar" cars: same body type & brand favoured, close price.
export function similar(cars: Car[], car: Car, n = 3): Car[] {
  return cars
    .filter((c) => c.slug !== car.slug && !c.sold)
    .map((c) => {
      let score = 0;
      if (c.bodyType === car.bodyType) score += 3;
      if (c.brand === car.brand) score += 2;
      const pa = car.priceAed ?? 0, pb = c.priceAed ?? 0;
      score += 1 - Math.min(1, Math.abs(pb - pa) / Math.max(pa, 1));
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.c);
}
