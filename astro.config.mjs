import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const AFFILIATE_DOMAINS = [
  'amazon.com', 'www.amazon.com', 'amzn.to',
  'amazon.co.uk', 'amazon.ca', 'amazon.com.au',
  'lifeboostcoffee.com', 'koacoffee.com', '1stincoffee.com',
  'drinktrade.com', 'volcanicacoffee.com',
];

function rehypeAffiliateLinks() {
  function walk(node) {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href ?? '';
      if (AFFILIATE_DOMAINS.some((d) => href.includes(d))) {
        node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
        node.properties.target = '_blank';
      }
    }
    if (node.children) node.children.forEach(walk);
  }
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://brewtested.pulsedash-app.com',
  base: '',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
  ],
  markdown: {
    shikiConfig: { theme: 'github-light' },
    rehypePlugins: [rehypeAffiliateLinks],
  },
});
