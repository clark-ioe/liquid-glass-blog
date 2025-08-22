---
title: 'Code Blocks: Syntax Highlighting and Copy Interaction'
excerpt: 'Consistent, accessible, and elegant code blocks with copy-to-clipboard UX.'
date: '2025-08-19'
category: 'Technology'
tags: ['markdown', 'ux', 'highlight']
featured: true
author: 'Clark'
status: 'published'
---

## Goals

- Unified styling across light/dark themes
- Single outer border with a clear header (language + copy)
- Accurate clipboard copy (plain text only)

## Usage

Fenced code blocks with language hints:

```ts
export function sum(a: number, b: number): number {
  return a + b;
}
```

## Inline Code

Use inline code for keywords like `npm run dev`.

## Copy Interaction

- Click the Copy button to copy pure text
- Visual feedback shows “Copied!” briefly

## Where It Is Implemented

- Component: `src/components/MarkdownRenderer.tsx`
- Styles: `src/app/globals.css` (selectors: `.code-block`, `.code-header`, `.code-content`)
