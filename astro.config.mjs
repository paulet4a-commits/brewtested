import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

function rehypeAffiliateLinks() {
  function walk(node) {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href ?? '';
      if (href.includes('amazon.com')) {
        node.properties.rel = ['sponsored', 'nofollow', 'noopener'];
        node.properties.target = '_blank';
      }
    }
    if (node.children) node.children.forEach(walk);
  }
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://paulet4a-commits.github.io',
  base: '/brewtested',
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
