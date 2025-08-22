---
title: 'Getting Started with LiquidGlass Blog'
excerpt: 'Install, run, and understand the project structure in minutes.'
date: '2025-08-25'
category: 'Tutorial'
tags: ['setup', 'guide', 'nextjs']
featured: false
author: 'Clark'
status: 'published'
---

## Overview

LiquidGlass Blog is a minimal and elegant blog template powered by Next.js 14, TypeScript, and Tailwind CSS. This guide helps you get productive in minutes.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Installation

```bash
pnpm install
# or
npm install
```

## Development

```bash
pnpm dev
# or
npm run dev
```

Open `http://localhost:3000` (or the port suggested in the terminal).

## Build and Start

```bash
pnpm build && pnpm start
```

## Project Structure

```text
src/
  app/           # App Router pages
  components/    # Reusable components
  lib/           # Utilities and configuration
  types/         # TypeScript types
content/
  posts/         # Markdown posts
public/          # Static assets
```

## Next Steps

- Edit site settings in `src/lib/site-config.ts`
- Add your first post to `content/posts/`
- Deploy to Vercel
