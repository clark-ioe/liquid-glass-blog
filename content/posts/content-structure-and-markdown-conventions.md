---
title: 'Content Structure and Markdown Conventions'
excerpt: 'How to organize posts and write clean Markdown with consistent frontmatter.'
date: '2025-08-23'
category: 'Tutorial'
tags: ['markdown', 'frontmatter', 'content']
featured: false
author: 'Clark'
status: 'published'
---

## Directory

- Posts live in `content/posts/` as `.md` files

## Frontmatter Template

```yaml
---
title: 'Post Title'
excerpt: 'One-sentence summary that is concise and clear.'
date: '2025-01-15'
category: 'Technology'
tags: ['nextjs', 'typescript']
featured: false
author: 'Clark'
status: 'published'
---
```

## Markdown Guidelines

- Use H2/H3 (H1 is provided by the page layout)
- Keep paragraphs 4–6 lines
- Prefer descriptive link text over raw URLs
- Provide language hints for code blocks, e.g. ```ts

## Inline vs Block Code

- Inline: `npm run dev`
- Block:

```bash
pnpm dev
```
