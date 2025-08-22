// Site configuration - centralized configuration for easy customization
export const siteConfig = {
  // Basic site information
  site: {
    name: 'LiquidGlass Blog',
    description: 'A minimal and elegant blog template',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://liquid-glass-blog.vercel.app/',
    language: 'en',
    author: 'LiquidGlass',
    email: 'clark@intentoriented.com',
    github: 'git@github.com:clark-ioe/liquid-glass-blog.git',
    twitter: 'https://x.com/clark_ioe',
  },

  // Icon color system - unified monochrome design
  icons: {
    // Primary icon color for main elements
    primary: 'text-primary-600 dark:text-primary-400',
    // Secondary icon color for supporting elements
    secondary: 'text-gray-600 dark:text-gray-400',
    // Accent icon color for highlights
    accent: 'text-accent-600 dark:text-accent-400',
    // Muted icon color for subtle elements
    muted: 'text-gray-500 dark:text-gray-500',
    // White icon color for dark backgrounds
    white: 'text-white',
    // Default icon color (fallback)
    default: 'text-gray-700 dark:text-gray-300',
  },

  // Article categories - centralized and easily customizable
  categories: {
    // Main category definitions with unified monochrome icons
    definitions: {
      Technology: {
        label: 'Technology',
        color: 'blue',
        description: 'Technology insights and updates',
        icon: '💻',
        iconColor: 'text-blue-600 dark:text-blue-400',
      },
      Tutorial: {
        label: 'Tutorial',
        color: 'emerald',
        description: 'Step-by-step guides and tutorials',
        icon: '📚',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
      },
      Thoughts: {
        label: 'Thoughts',
        color: 'purple',
        description: 'Personal thoughts and reflections',
        icon: '💭',
        iconColor: 'text-purple-600 dark:text-purple-400',
      },
      Tools: {
        label: 'Tools',
        color: 'amber',
        description: 'Useful tools and resources',
        icon: '🔧',
        iconColor: 'text-amber-600 dark:text-amber-400',
      },
      Life: {
        label: 'Life',
        color: 'rose',
        description: 'Life experiences and stories',
        icon: '🌟',
        iconColor: 'text-rose-600 dark:text-rose-400',
      },
      Release: {
        label: 'Release',
        color: 'primary',
        description: 'Release notes and updates',
        icon: '🚀',
        iconColor: 'text-primary-600 dark:text-primary-400',
      },
      Product: {
        label: 'Product',
        color: 'indigo',
        description: 'Product development insights',
        icon: '🎯',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
      },
      Developer: {
        label: 'Developer',
        color: 'cyan',
        description: 'Developer tips and tricks',
        icon: '👨‍💻',
        iconColor: 'text-cyan-600 dark:text-cyan-400',
      },
      Event: {
        label: 'Event',
        color: 'pink',
        description: 'Events and conferences',
        icon: '📅',
        iconColor: 'text-pink-600 dark:text-pink-400',
      },
      Company: {
        label: 'Company',
        color: 'slate',
        description: 'Company news and updates',
        icon: '🏢',
        iconColor: 'text-slate-600 dark:text-slate-400',
      },
    },

    // Category display order for navigation and tabs
    displayOrder: [
      'Technology',
      'Tutorial',
      'Thoughts',
      'Tools',
      'Life',
      'Release',
      'Product',
      'Developer',
      'Event',
      'Company',
    ],

    // Default category for new posts
    default: 'Technology',

    // Featured categories (shown prominently)
    featured: ['Technology', 'Tutorial', 'Thoughts'],
  },

  // Navigation configuration
  navigation: {
    main: [
      { name: 'Home', href: '/', icon: '🏠' },
      { name: 'Categories', href: '/categories', icon: '📂' },
      { name: 'Tags', href: '/tags', icon: '🏷️' },
      { name: 'About', href: '/about', icon: 'ℹ️' },
    ],
    footer: {
      quickLinks: [
        { name: 'Home', href: '/' },
        { name: 'Categories', href: '/categories' },
        { name: 'Tags', href: '/tags' },
        { name: 'About', href: '/about' },
      ],
      legal: [
        { name: 'Privacy Policy', href: '/about' },
        { name: 'Terms of Service', href: '/about' },
      ],
    },
  },

  // UI/UX configuration
  ui: {
    // Color scheme
    colors: {
      primary: 'primary',
      accent: 'accent',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
    },

    // Animation durations
    animations: {
      fast: 'duration-200',
      normal: 'duration-300',
      slow: 'duration-500',
    },

    // Spacing system
    spacing: {
      section: 'py-16',
      card: 'p-6',
      button: 'px-4 py-2',
    },

    // Border radius
    borderRadius: {
      small: 'rounded-lg',
      medium: 'rounded-xl',
      large: 'rounded-2xl',
      full: 'rounded-full',
    },
  },

  // Search configuration
  search: {
    minQueryLength: 2,
    maxResults: 20,
    keyboardShortcuts: {
      open: '⌘K',
      close: 'Escape',
    },
  },

  // Social media configuration
  social: {
    platforms: [
      {
        name: 'GitHub',
        url: 'https://github.com',
        icon: 'github',
        color: 'gray',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com',
        icon: 'twitter',
        color: 'blue',
      },
      {
        name: 'Email',
        url: 'mailto:contact@example.com',
        icon: 'mail',
        color: 'gray',
      },
    ],
  },

  // SEO and metadata
  seo: {
    defaultTitle: 'LiquidGlass Blog',
    defaultDescription: 'A minimal and elegant blog template',
    defaultKeywords: ['blog', 'nextjs', 'markdown', 'technology', 'development'],
    openGraph: {
      type: 'website',
      siteName: 'LiquidGlass Blog',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@clark_ioe',
    },
  },

  // Content configuration
  content: {
    // Reading time calculation
    readingTime: {
      wordsPerMinute: 200,
    },
    // Excerpt settings
    excerpt: {
      maxLength: 160,
      preserveWords: true,
    },
    // Featured posts
    featured: {
      maxCount: 3,
      showOnHome: true,
    },
    // Pagination settings
    pagination: {
      defaultPageSize: 12,
      pageSizeOptions: [6, 12, 24, 48],
      maxPageSize: 100,
      showPageSizeSelector: true,
      showPageInfo: true,
    },
  },

  // Theme configuration
  theme: {
    default: 'system', // 'light', 'dark', 'system'
    enableSystemPreference: true,
    enableLocalStorage: true,
  },
};

// Helper functions for working with categories
export const categoryUtils = {
  // Get category definition by name
  getCategory: (name: string) => {
    const category =
      siteConfig.categories.definitions[name as CategoryName] ||
      siteConfig.categories.definitions[siteConfig.categories.default as CategoryName];
    return category;
  },

  // Get all category names in display order
  getAllCategories: () => {
    return siteConfig.categories.displayOrder;
  },

  // Get featured categories
  getFeaturedCategories: () => {
    return siteConfig.categories.featured;
  },

  // Validate category name
  isValidCategory: (name: string) => {
    return name in siteConfig.categories.definitions;
  },
};

// Export types for TypeScript
export type SiteConfig = typeof siteConfig;
export type CategoryDefinition =
  (typeof siteConfig.categories.definitions)[keyof typeof siteConfig.categories.definitions];
export type CategoryName = keyof typeof siteConfig.categories.definitions;
