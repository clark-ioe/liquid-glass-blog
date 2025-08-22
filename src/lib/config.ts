import { siteConfig } from './site-config';

// Blog configuration - now using centralized site config
export const blogConfig = {
  // Site information from centralized config
  site: siteConfig.site,

  // Search configuration
  search: siteConfig.search,

  // Content configuration
  content: siteConfig.content,

  // UI configuration
  ui: siteConfig.ui,

  // Navigation
  navigation: siteConfig.navigation,

  // Categories
  categories: siteConfig.categories,

  // Social media
  social: siteConfig.social,

  // SEO
  seo: siteConfig.seo,

  // Theme
  theme: siteConfig.theme,
};

// Export the main site config for direct access
export { siteConfig };

// Export category utilities
export { categoryUtils } from './site-config';

// Export types
export type { SiteConfig, CategoryDefinition, CategoryName } from './site-config';
