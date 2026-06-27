import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// GTA Cars Dubai — pre-owned inventory snapshot scraped verbatim from the live
// gtacars.ae showroom (one JSON per vehicle). AED price + monthly are the real
// published figures. Specs are the real published listing specs. Nothing invented.
// Production: couple to the WordPress/JetEngine feed (see JUDGEMENT_CALLS.md).
const cars = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cars' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),              // full verbatim listing title
    name: z.string(),              // short card name (year + brand + model)
    brand: z.string(),
    model: z.string().default(''),
    year: z.number().nullable(),
    bodyType: z.string().default('Other'),
    priceAed: z.number().nullable(),
    monthlyAed: z.number().nullable(),
    specs: z.object({
      mileageKm: z.number().nullable().optional(),
      transmission: z.string().optional(),
      cylinders: z.string().optional(),
      horsepower: z.string().optional(),
      fuelType: z.string().optional(),
      colour: z.string().optional(),
      doors: z.string().optional(),
      regional: z.string().optional(),       // e.g. GCC
      serviceHistory: z.string().optional(),
      serviceContract: z.string().optional(),
      warranty: z.string().optional(),
    }),
    description: z.string().default(''),
    images: z.array(z.string()).default([]),
    cardImage: z.string().optional(),
    sold: z.boolean().default(false),
    sourceUrl: z.string().optional(),
  }),
});

export const collections = { cars };
