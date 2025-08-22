import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import type { PostMeta } from '@/types/post';

// Types
interface PostCardProps {
  post: PostMeta;
  variant?: 'default' | 'featured' | 'compact';
}

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

interface PostMetaInfoProps {
  date: string;
  readTime: number;
  className?: string;
}

// Constants
const VARIANT_STYLES = {
  default: {
    container:
      'group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600',
    image:
      'aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105',
    content: 'p-6',
    title:
      'mb-3 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 dark:text-gray-100 dark:group-hover:text-primary-400',
    excerpt: 'mb-4 text-gray-600 line-clamp-3 dark:text-gray-400',
  },
  featured: {
    container:
      'group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600',
    image:
      'aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105',
    content: 'p-8',
    title:
      'mb-4 text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 dark:text-gray-100 dark:group-hover:text-primary-400',
    excerpt: 'mb-6 text-gray-600 line-clamp-4 text-lg dark:text-gray-400',
  },
  compact: {
    container:
      'group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600',
    image:
      'aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105',
    content: 'p-4',
    title:
      'mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 dark:text-gray-100 dark:group-hover:text-primary-400',
    excerpt: 'mb-3 text-gray-600 line-clamp-2 text-sm dark:text-gray-400',
  },
} as const;

// Utility functions
const getReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const formatDate = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};

// Components
const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const categoryInfo =
    siteConfig.categories.definitions[category as keyof typeof siteConfig.categories.definitions];

  if (!categoryInfo) return null;

  return (
    <div
      className={`inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-600 ${className}`}
    >
      <span className={`mr-1.5 ${categoryInfo.iconColor}`}>{categoryInfo.icon}</span>
      {categoryInfo.label}
    </div>
  );
};

const PostMetaInfo: React.FC<PostMetaInfoProps> = ({ date, readTime, className = '' }) => (
  <div
    className={`flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 ${className}`}
  >
    <time dateTime={date} className="flex items-center">
      <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      {formatDate(new Date(date))}
    </time>
    <span className="flex items-center">
      <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {readTime} min read
    </span>
  </div>
);

// Main component
export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const styles = VARIANT_STYLES[variant];
  const readTime = getReadTime(post.excerpt);

  return (
    <article className={styles.container}>
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Content */}
        <div className={styles.content}>
          {/* Category Badge */}
          {post.category && <CategoryBadge category={post.category} className="mb-3" />}

          {/* Title */}
          <h2 className={styles.title}>{post.title}</h2>

          {/* Excerpt */}
          <p className={styles.excerpt}>{post.excerpt}</p>

          {/* Meta Information */}
          <PostMetaInfo date={post.date} readTime={readTime} className="mt-auto" />
        </div>
      </Link>
    </article>
  );
}
