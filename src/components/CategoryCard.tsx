import Link from 'next/link';

import { cn } from '@/lib/styles';
import { Category } from '@/types/post';

interface CategoryCardProps {
  category: Category;
  showPostCount?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export default function CategoryCard({
  category,
  showPostCount = true,
  variant = 'default',
}: CategoryCardProps) {
  const baseClasses =
    'group relative h-full overflow-hidden rounded-xl transition-all duration-300';

  const variantClasses = {
    default:
      'border border-gray-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800',
    compact:
      'border border-gray-200 bg-gray-50 hover:bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700',
    featured:
      'border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white shadow-lg hover:shadow-xl hover:scale-105 dark:border-primary-700 dark:from-primary-900 dark:to-gray-800',
  } as const;

  const iconClasses = {
    default: 'text-3xl',
    compact: 'text-2xl',
    featured: 'text-4xl',
  } as const;

  const titleClasses = {
    default: 'text-lg font-semibold',
    compact: 'text-base font-medium',
    featured: 'text-xl font-bold',
  } as const;

  return (
    <Link href={`/categories/${category.slug}`}>
      <div className={cn(baseClasses, variantClasses[variant])}>
        <div className="p-6">
          {/* Icon and Title */}
          <div className="mb-4 flex items-center space-x-3">
            <div
              className={cn(
                iconClasses[variant],
                variant === 'featured' ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400',
              )}
            >
              {category.icon}
            </div>
            <div>
              <h3
                className={cn(
                  titleClasses[variant],
                  'text-gray-900 transition-colors duration-200 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400',
                )}
              >
                {category.name}
              </h3>
              {variant !== 'compact' && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          {/* Post Count and Stats */}
          {showPostCount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.postCount} Articles
                </span>
              </div>

              {/* Priority Badge */}
              {variant === 'featured' && (
                <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  Priority {category.priority}
                </span>
              )}
            </div>
          )}

          {/* Hover Effect */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
