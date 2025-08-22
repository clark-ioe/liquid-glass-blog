---
title: 'SEO and Social Sharing for LiquidGlass Blog'
excerpt: 'Metadata, Open Graph, and Twitter cards made simple.'
date: '2025-08-19'
category: 'Technology'
tags: ['seo', 'metadata', 'opengraph']
featured: false
author: 'Clark'
status: 'published'
---

## Where to Configure

- `siteConfig.seo` controls defaults: title, description, keywords, Open Graph, Twitter
- Pages can override metadata via their `metadata` exports

## Best Practices

- Keep titles under 60 characters
- Write concise, descriptive meta descriptions (120–160 chars)
- Provide a valid `og:image`

## Example

```ts
export const metadata = {
  title: 'Tags - LiquidGlass Blog',
  description: 'Browse all article tags, discover related topics and content',
};
```
