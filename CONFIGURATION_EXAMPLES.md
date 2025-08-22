# Configuration Examples

This document provides practical examples of how to customize your blog for different use cases.

## 🚀 Quick Start Customization

### 1. Change Site Information

Edit `src/lib/site-config.ts`:

```typescript
export const siteConfig = {
  site: {
    name: 'My Awesome Blog', // Change this
    description: 'A blog about my interests', // Change this
    url: 'https://myblog.com', // Change this
    language: 'en', // Change this
    author: 'John Doe', // Change this
    email: 'john@myblog.com', // Change this
    github: 'https://github.com/johndoe', // Change this
    twitter: 'https://twitter.com/johndoe', // Change this
  },
  // ... rest of config
};
```

### 2. Customize Categories

```typescript
categories: {
  definitions: {
    'Programming': {                    // New category
      label: 'Programming',
      color: 'blue',
      description: 'Programming tutorials and tips',
      icon: '💻',
    },
    'Design': {                        // New category
      label: 'Design',
      color: 'purple',
      description: 'Design principles and inspiration',
      icon: '🎨',
    },
    'Business': {                      // New category
      label: 'Business',
      color: 'green',
      description: 'Business insights and strategies',
      icon: '💼',
    },
    // Remove or modify existing categories as needed
  },

  displayOrder: ['Programming', 'Design', 'Business'], // Update order
  featured: ['Programming', 'Design'],                 // Update featured
}
```

### 3. Update Navigation

```typescript
navigation: {
  main: [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Blog', href: '/blog', icon: '📝' },      // Custom page
    { name: 'Portfolio', href: '/portfolio', icon: '💼' }, // Custom page
    { name: 'Contact', href: '/contact', icon: '📧' }, // Custom page
  ],
  footer: {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }, // Add new legal page
    ],
  },
}
```

### 4. Customize Social Media

```typescript
social: {
  platforms: [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github',
      color: 'gray',
    },
    {
      name: 'LinkedIn',                // Add LinkedIn
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin',
      color: 'blue',
    },
    {
      name: 'YouTube',                  // Add YouTube
      url: 'https://youtube.com/@yourchannel',
      icon: 'youtube',
      color: 'red',
    },
    {
      name: 'Instagram',                // Add Instagram
      url: 'https://instagram.com/yourusername',
      icon: 'instagram',
      color: 'pink',
    },
  ],
}
```

## 🎨 Theme Customization

### 1. Change Color Scheme

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Main brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Accent color
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
    },
  },
};
```

### 2. Custom Fonts

```javascript
// In tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Keep Inter
        serif: ['Merriweather', 'Georgia', 'serif'], // Add serif font
        mono: ['JetBrains Mono', 'monospace'], // Keep JetBrains Mono
        display: ['Poppins', 'sans-serif'], // Add display font
      },
    },
  },
};
```

Then update `src/app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
```

## 📱 Content Customization

### 1. Add New Post Types

Create new post types by extending the Post interface in `src/types/post.ts`:

```typescript
export interface Post {
  // ... existing fields
  series?: string; // For series posts
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // For tutorials
  estimatedTime?: string; // For time estimates
  prerequisites?: string[]; // For required knowledge
}
```

### 2. Custom Post Templates

Create different post layouts in `src/components/`:

```typescript
// src/components/PostCard.tsx
export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  if (post.series) {
    return <SeriesPostCard post={post} />;
  }

  if (post.difficulty) {
    return <TutorialPostCard post={post} />;
  }

  return <DefaultPostCard post={post} />;
}
```

### 3. Add Custom Pages

Create new pages in `src/app/`:

```typescript
// src/app/portfolio/page.tsx
export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>
      {/* Your portfolio content */}
    </div>
  );
}

// src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
      {/* Contact form or information */}
    </div>
  );
}
```

## 🔧 Advanced Customization

### 1. Custom Search Logic

Extend the search functionality in `src/components/SearchDialog.tsx`:

```typescript
const searchPosts = useCallback(
  (searchQuery: string, maxResults: number = siteConfig.search.maxResults): PostMeta[] => {
    if (!searchQuery.trim()) return [];
    const searchLower = searchQuery.toLowerCase();

    const searchResults = posts
      .map((post) => {
        let score = 0;

        // Title search (highest priority)
        if (post.title.toLowerCase().includes(searchLower)) score += 10;

        // Excerpt search
        if (post.excerpt.toLowerCase().includes(searchLower)) score += 5;

        // Tags search
        if (post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))) score += 3;

        // Category search
        if (post.category?.toLowerCase().includes(searchLower)) score += 2;

        // Series search (if you added series field)
        if (post.series?.toLowerCase().includes(searchLower)) score += 2;

        // Difficulty search (if you added difficulty field)
        if (post.difficulty?.toLowerCase().includes(searchLower)) score += 1;

        return { post, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((item) => item.post);

    return searchResults;
  },
  [posts],
);
```

### 2. Custom Analytics

Add analytics tracking in `src/app/layout.tsx`:

```typescript
// Add to your layout component
useEffect(() => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // Custom event tracking
  const trackPageView = () => {
    // Your custom tracking logic
  };

  trackPageView();
}, []);
```

### 3. Custom Hooks

Create reusable hooks in `src/hooks/`:

```typescript
// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage in components
const [theme, setTheme] = useLocalStorage('theme', 'system');
```

## 📊 Performance Optimization

### 1. Image Optimization

```typescript
// In your components
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Lazy Loading

```typescript
// For below-the-fold content
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // If component doesn't need SSR
});

// In your JSX
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

## 🚀 Deployment Configuration

### 1. Environment Variables

Create `.env.local`:

```bash
# Site configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Blog Name"

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_UMAMI_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Social media
NEXT_PUBLIC_TWITTER_USERNAME=@yourusername
NEXT_PUBLIC_GITHUB_USERNAME=yourusername

# Content
CONTENT_DIR=content
POSTS_PER_PAGE=10
```

### 2. Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev",
  "regions": ["iad1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

## 🎯 Use Case Examples

### 1. Personal Blog

```typescript
// Minimal configuration
export const siteConfig = {
  site: {
    name: "John Doe's Blog",
    description: 'Personal thoughts and experiences',
    author: 'John Doe',
    // ... minimal config
  },
  categories: {
    definitions: {
      Life: { label: 'Life', color: 'blue', icon: '🌟' },
      Thoughts: { label: 'Thoughts', color: 'purple', icon: '💭' },
      Travel: { label: 'Travel', color: 'green', icon: '✈️' },
    },
    displayOrder: ['Life', 'Thoughts', 'Travel'],
    featured: ['Life', 'Thoughts'],
  },
};
```

### 2. Tech Blog

```typescript
// Technology-focused configuration
export const siteConfig = {
  site: {
    name: 'Tech Insights',
    description: 'Technology tutorials and insights',
    author: 'Tech Writer',
    // ... tech-focused config
  },
  categories: {
    definitions: {
      Programming: { label: 'Programming', color: 'blue', icon: '💻' },
      Tutorial: { label: 'Tutorial', color: 'green', icon: '📚' },
      Tools: { label: 'Tools', color: 'orange', icon: '🛠️' },
      Architecture: { label: 'Architecture', color: 'purple', icon: '🏗️' },
    },
    displayOrder: ['Programming', 'Tutorial', 'Tools', 'Architecture'],
    featured: ['Programming', 'Tutorial'],
  },
};
```

### 3. Business Blog

```typescript
// Business-focused configuration
export const siteConfig = {
  site: {
    name: 'Business Insights',
    description: 'Business strategies and insights',
    author: 'Business Consultant',
    // ... business-focused config
  },
  categories: {
    definitions: {
      Strategy: { label: 'Strategy', color: 'blue', icon: '🎯' },
      Marketing: { label: 'Marketing', color: 'green', icon: '📢' },
      Leadership: { label: 'Leadership', color: 'purple', icon: '👑' },
      Finance: { label: 'Finance', color: 'green', icon: '💰' },
    },
    displayOrder: ['Strategy', 'Marketing', 'Leadership', 'Finance'],
    featured: ['Strategy', 'Marketing'],
  },
};
```

## 🔍 Troubleshooting

### Common Issues

1. **Categories not showing**: Check that category names in your markdown files match exactly with the configuration
2. **Search not working**: Ensure posts have proper frontmatter with title and excerpt
3. **Styling issues**: Check that Tailwind CSS is properly configured
4. **Build errors**: Run `pnpm type-check` to identify TypeScript issues

### Getting Help

- Check the main README.md for basic setup
- Review the configuration examples above
- Check the TypeScript types for proper structure
- Open an issue on GitHub for specific problems

---

**Happy customizing! 🎨**
