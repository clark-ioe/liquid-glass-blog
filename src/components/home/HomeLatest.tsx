'use client';

import { useMemo, useState } from 'react';

import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import { siteConfig } from '@/lib/config';
import type { CategoryName } from '@/lib/site-config';
import type { PostMeta, Pagination as PaginationType } from '@/types/post';

interface HomeLatestProps {
  posts: PostMeta[];
  pagination: PaginationType;
}

export default function HomeLatest({ posts, pagination: initialPagination }: HomeLatestProps) {
  const [active, setActive] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = initialPagination.limit;

  // Get categories from centralized config
  const availableCategories = useMemo(() => {
    const postCategories = posts
      .map((p) => p.category)
      .filter((category): category is CategoryName => Boolean(category));

    // Use Set to remove duplicates and convert back to array
    const uniqueCategories = Array.from(new Set(postCategories));

    return ['All', ...uniqueCategories];
  }, [posts]);

  const filtered = useMemo(() => {
    if (active === 'All') return posts;
    return posts.filter((p) => p.category === active);
  }, [active, posts]);

  // Calculate pagination for filtered results
  const pagination = useMemo(() => {
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, currentPage), totalPages);

    return {
      page: safePage,
      limit: pageSize,
      total,
      totalPages,
    };
  }, [filtered.length, currentPage, pageSize]);

  // Get current page items
  const currentPageItems = useMemo(() => {
    const startIndex = (pagination.page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filtered.slice(startIndex, endIndex);
  }, [filtered, pagination.page, pageSize]);

  const handleTabClick = (tab: string) => {
    setActive(tab);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="mb-16">
      {/* Enhanced tabs with better visual hierarchy */}
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Latest Articles
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          {availableCategories.map((tab) => {
            const categoryInfo =
              tab !== 'All' ? siteConfig.categories.definitions[tab as CategoryName] : null;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`group relative rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  active === tab
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25 ring-2 ring-primary-500/20'
                    : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:shadow-md hover:ring-2 hover:ring-primary-200 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-gray-700 dark:hover:ring-primary-600'
                }`}
              >
                {categoryInfo && (
                  <span className={`mr-2 ${categoryInfo.iconColor}`}>{categoryInfo.icon}</span>
                )}
                {tab}
                {/* Active indicator */}
                {active === tab && (
                  <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Enhanced grid with better spacing and empty state */}
      {currentPageItems.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPageItems.map((post) => (
              <PostCard key={post.slug} post={post} variant="compact" />
            ))}
          </div>

          {/* Pagination - only show if there are multiple pages */}
          {pagination.totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                pagination={pagination}
                showPageSize={true}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="py-16 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            No articles found
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Try selecting a different category or check back later for new content.
          </p>
          <button
            onClick={() => handleTabClick('All')}
            className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            View All Articles
          </button>
        </div>
      )}
    </section>
  );
}
