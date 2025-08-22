import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { generateSlug } from '@/lib/utils';
import { PostMeta, Post, Category, Tag } from '@/types/post';

import { siteConfig, categoryUtils } from './config';

import type { CategoryName } from './site-config';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Simple in-memory cache
const postsCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Type guard: full post
function validatePost(post: unknown): post is Post {
  if (post == null || typeof post !== 'object') return false;
  const obj = post as Record<string, unknown>;
  return (
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.excerpt === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.date === 'string'
  );
}

// Type guard: post meta
function validatePostMeta(post: unknown): post is PostMeta {
  if (post == null || typeof post !== 'object') return false;
  const obj = post as Record<string, unknown>;
  return (
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.excerpt === 'string' &&
    typeof obj.date === 'string'
  );
}

// Simple reading time estimation
function calculateReadingTime(content: string): number {
  const wordsPerMinute = siteConfig.content.readingTime.wordsPerMinute;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function getCachedData<T>(key: string): T | null {
  const cached = postsCache.get(key);
  if (!cached) return null;

  if (Date.now() - cached.timestamp > CACHE_TTL) {
    postsCache.delete(key);
    return null;
  }

  return cached.data as T;
}

function setCachedData<T>(key: string, data: T): void {
  postsCache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(): void {
  postsCache.clear();
}

function processPostMetadata(matterResult: matter.GrayMatterFile<string>, slug: string): PostMeta {
  // Simple validation
  const category =
    matterResult.data.category && categoryUtils.isValidCategory(matterResult.data.category)
      ? matterResult.data.category
      : undefined;

  const tags = Array.isArray(matterResult.data.tags)
    ? matterResult.data.tags.filter((tag) => typeof tag === 'string' && tag.trim().length > 0)
    : [];

  return {
    slug,
    title: matterResult.data.title || 'Untitled',
    excerpt: matterResult.data.excerpt || '',
    date: matterResult.data.date || new Date().toISOString(),
    coverImage:
      typeof matterResult.data.coverImage === 'string' ? matterResult.data.coverImage : undefined,
    category,
    tags,
    readingTime: calculateReadingTime(matterResult.content),
    featured: matterResult.data.featured || false,
    author: matterResult.data.author,
    lastModified: matterResult.data.lastModified || matterResult.data.date,
    status: (matterResult.data.status as 'draft' | 'published' | 'archived') || 'published',
  };
}

export function getPostsMeta(): PostMeta[] {
  const cacheKey = 'posts-meta';
  const cached = getCachedData<PostMeta[]>(cacheKey);
  if (cached) return cached;

  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(process.cwd(), 'content/posts', fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const matterResult = matter(fileContents);

          const post = processPostMetadata(matterResult, slug);
          return validatePostMeta(post) ? post : null;
        } catch (error) {
          console.error(`Error processing post ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is PostMeta => post !== null);

    const sortedPosts = allPostsData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setCachedData(cacheKey, sortedPosts);
    return sortedPosts;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  const cacheKey = `post-${slug}`;
  const cached = getCachedData<Post>(cacheKey);
  if (cached) return cached;

  try {
    const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const postMeta = processPostMetadata(matterResult, slug);
    const post: Post = {
      ...postMeta,
      content: matterResult.content,
    };

    if (validatePost(post)) {
      setCachedData(cacheKey, post);
      return post;
    }
    return null;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getCategories(): Category[] {
  const cacheKey = 'categories';
  const cached = getCachedData<Category[]>(cacheKey);
  if (cached) return cached;

  const posts = getPostsMeta();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    if (post.category) {
      categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
    }
  });

  // Generate categories from site config
  const categories: Category[] = Object.entries(siteConfig.categories.definitions).map(
    ([name, def]) => ({
      name: name as CategoryName,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: def.description,
      icon: def.icon,
      iconColor: def.iconColor,
      priority: siteConfig.categories.displayOrder.indexOf(name as CategoryName) + 1,
      postCount: categoryMap.get(name) || 0,
    }),
  );

  categories.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return b.postCount - a.priority;
  });

  setCachedData(cacheKey, categories);
  return categories;
}

export function getTags(): Tag[] {
  const cacheKey = 'tags';
  const cached = getCachedData<Tag[]>(cacheKey);
  if (cached) return cached;

  const posts = getPostsMeta();
  const tagMap = new Map<string, number>();
  const tagCategoryMap = new Map<string, Set<string>>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);

      if (post.category) {
        if (!tagCategoryMap.has(tag)) {
          tagCategoryMap.set(tag, new Set());
        }
        tagCategoryMap.get(tag)!.add(post.category);
      }
    });
  });

  const tags: Tag[] = Array.from(tagMap.entries()).map(([name, postCount]) => ({
    name,
    slug: generateSlug(name),
    postCount,
    relatedCategories: Array.from(tagCategoryMap.get(name) || []) as CategoryName[],
  }));

  tags.sort((a, b) => b.postCount - a.postCount);

  setCachedData(cacheKey, tags);
  return tags;
}

export function getPostsByCategory(category: string): PostMeta[] {
  if (!categoryUtils.isValidCategory(category)) {
    return [];
  }

  const posts = getPostsMeta();
  return posts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getPostsMeta();
  return posts.filter((post) => post.tags?.includes(tag));
}

export function searchPosts(query: string, limit: number = 10): PostMeta[] {
  if (!query.trim()) return [];

  const posts = getPostsMeta();
  const searchLower = query.toLowerCase();

  const searchResults = posts
    .map((post) => {
      let score = 0;

      if (post.title.toLowerCase().includes(searchLower)) score += 10;

      if (post.excerpt.toLowerCase().includes(searchLower)) score += 5;

      if (post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))) {
        score += 3;
      }

      if (post.category?.toLowerCase().includes(searchLower)) {
        score += 2;
      }

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return searchResults;
}
