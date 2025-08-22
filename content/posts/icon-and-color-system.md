---
title: 'Unified Icon and Color System'
excerpt: 'Monochrome icons with consistent semantics across light and dark themes.'
date: '2025-08-22'
category: 'Technology'
tags: ['design', 'icons', 'tailwind']
featured: false
author: 'Clark'
status: 'published'
---

## Overview

We use a unified monochrome icon system. Each category defines an icon and a Tailwind color class. This ensures visual consistency and easy theme alignment.

## Where

- `siteConfig.icons` for common color tokens
- `siteConfig.categories.definitions[*].iconColor` for category-specific colors

## Example

```tsx
<span className={`mr-1.5 ${categoryInfo.iconColor}`}>{categoryInfo.icon}</span>
```

## Best Practices

- Prefer semantic color tokens over hard-coded hex
- Keep icon styles minimal; let layout provide hierarchy
