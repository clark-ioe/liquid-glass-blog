import { CategoryName } from '@/lib/site-config';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  category?: CategoryName; // Use fixed category types from site config
  tags?: string[];
  readingTime: number;
  featured?: boolean;
  author?: string;
  lastModified?: string;
  status?: 'draft' | 'published' | 'archived';
}

// Post meta (without content)
export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  category?: CategoryName; // Use fixed category types from site config
  tags?: string[];
  readingTime: number;
  featured?: boolean;
  author?: string;
  lastModified?: string;
  status?: 'draft' | 'published' | 'archived';
}

// Category type - Now based on site config definitions
export interface Category {
  name: CategoryName;
  slug: string;
  description: string;
  icon: string;
  iconColor: string;
  priority: number;
  postCount: number;
}

// Tag type
export interface Tag {
  name: string;
  slug: string;
  postCount: number;
  relatedCategories?: CategoryName[]; // Tag-related categories
}

// Pagination type
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Post list query params
export interface PostQueryParams {
  page?: number;
  limit?: number;
  category?: CategoryName;
  tags?: string[];
  featured?: boolean;
  search?: string;
  sortBy?: 'date' | 'title' | 'readingTime';
  sortOrder?: 'asc' | 'desc';
}
