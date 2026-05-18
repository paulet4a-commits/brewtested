import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['coffee', 'kitchen', 'comparison', 'guide', 'coffee-makers', 'espresso', 'pour-over', 'french-press', 'grinders']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    affiliateDisclosure: z.boolean().default(true),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { posts };
