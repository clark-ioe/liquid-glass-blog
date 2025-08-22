---
title: 'Deploying LiquidGlass Blog to Vercel'
excerpt: 'From local build to production hosting in a few clicks.'
date: '2025-08-20'
category: 'Tutorial'
tags: ['vercel', 'deployment']
featured: false
author: 'Clark'
status: 'published'
---

## Build Locally

```bash
pnpm build
pnpm start
```

## Deploy Steps

1. Push the repo to GitHub
2. Import the repository in Vercel
3. Select the default Next.js preset
4. Click Deploy

## Environment Variables

- Add any public site URL to `NEXT_PUBLIC_SITE_URL` if needed

## Tips

- Use Vercel Analytics and Image Optimization
- Set up a custom domain in the Vercel dashboard
