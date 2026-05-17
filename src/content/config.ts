import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['coffee', 'kitchen', 'comparison', 'guide']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    affiliateDisclosure: z.boolean().default(true),
  }),
});

export const collections = { posts };
