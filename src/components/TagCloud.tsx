import Link from 'next/link';

import { cn } from '@/lib/styles';
import { Tag } from '@/types/post';

interface TagCloudProps {
  tags: Tag[];
  maxTags?: number;
  showPostCount?: boolean;
  variant?: 'default' | 'compact' | 'cloud';
  className?: string;
}

export default function TagCloud({
  tags,
  maxTags = 50,
  showPostCount = true,
  variant = 'default',
  className = '',
}: TagCloudProps) {
  const displayedTags = tags.slice(0, maxTags);

  const getTagSize = (postCount: number, maxCount: number) => {
    if (postCount >= maxCount * 0.8) return 'text-lg font-semibold';
    if (postCount >= maxCount * 0.5) return 'text-base font-medium';
    if (postCount >= maxCount * 0.2) return 'text-sm font-normal';
    return 'text-xs';
  };

  const getTagColor = (postCount: number, maxCount: number) => {
    if (postCount >= maxCount * 0.8)
      return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
    if (postCount >= maxCount * 0.5)
      return 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200';
    if (postCount >= maxCount * 0.2)
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  };

  if (variant === 'cloud') {
    const maxCount = Math.max(...tags.map((t) => t.postCount));

    return (
      <div className={cn('flex flex-wrap gap-2', className)}>
        {displayedTags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className={cn(
              'inline-block rounded-full px-3 py-1 transition-all duration-200 hover:scale-105 hover:shadow-md',
              getTagColor(tag.postCount, maxCount),
              getTagSize(tag.postCount, maxCount),
            )}
          >
            {tag.name}
            {showPostCount && <span className="ml-1 text-xs opacity-75">({tag.postCount})</span>}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-1', className)}>
        {displayedTags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className={cn(
              'inline-block rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors duration-200 hover:bg-gray-200',
              'dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
            )}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {displayedTags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tags/${tag.slug}`}
          className={cn(
            'group block rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-primary-300 hover:shadow-md',
            'dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600',
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                {tag.name}
              </h3>
              {tag.relatedCategories && tag.relatedCategories.length > 0 && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Related Categories: {tag.relatedCategories.join(', ')}
                </p>
              )}
            </div>
            {showPostCount && (
              <div className="text-right">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {tag.postCount}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Articles</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
