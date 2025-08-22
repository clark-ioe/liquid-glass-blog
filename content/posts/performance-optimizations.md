---
title: 'Performance Optimizations for a Snappy Blog'
excerpt: 'Practical tips: images, RSC, memoization, and pagination.'
date: '2025-08-18'
category: 'Technology'
tags: ['performance', 'nextjs', 'ux']
featured: false
author: 'Clark'
status: 'published'
---

## Images

- Prefer modern formats (WebP/AVIF) where possible
- Provide `width/height` to avoid layout shifts

## Rendering

- Use server components by default; keep client components minimal
- Defer heavy work; paginate on the client when it improves UX

## Memoization

- Use `useMemo` and `useCallback` for expensive computations in client components

## Pagination

- `PostsGrid` handles client-side pagination via `useSearchParams`
