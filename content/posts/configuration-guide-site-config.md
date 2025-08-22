---
title: 'Site Configuration Guide (site-config.ts)'
excerpt: 'Centralize your brand, navigation, categories, and SEO in one place.'
date: '2025-08-20'
category: 'Technology'
tags: ['configuration', 'branding', 'seo']
featured: true
author: 'Clark'
status: 'published'
---

## Why a Central Config?

A single source of truth simplifies customization and keeps your brand consistent across the app.

## Location

- File: `src/lib/site-config.ts`

## Key Sections

- `site`: name, description, url, author, social
- `icons`: unified monochrome icon color classes
- `categories`: definitions, display order, featured
- `navigation`: main and footer links
- `seo`: titles, descriptions, OpenGraph, Twitter
- `content`: pagination, excerpts, reading time
- `theme`: default theme, system preference

## Example

```ts
export const siteConfig = {
  site: {
    name: 'LiquidGlass Blog',
    description: 'A minimal and elegant blog template',
  },
  seo: {
    defaultTitle: 'LiquidGlass Blog',
  },
};
```

## Tips

- Keep labels short and meaningful
- Add or remove categories as needed
- Update `displayOrder` when you add new categories
