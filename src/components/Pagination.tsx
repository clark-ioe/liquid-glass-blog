'use client';

import { useMemo } from 'react';

import { useSearchParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/styles';
import type { Pagination } from '@/types/post';

interface PaginationProps {
  pagination: Pagination;
  className?: string;
  showPageInfo?: boolean;
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  pagination,
  className = '',
  showPageInfo = true,
  showPageSize = false,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { page, limit, total, totalPages } = pagination;

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, and pages around current page
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [page, totalPages]);

  // Create URL with updated search params
  const createPageUrl = (newPage: number, newLimit?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    if (newLimit) {
      params.set('limit', newLimit.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  // Handle page size change
  const handlePageSizeChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit.toString());
    params.set('page', '1'); // Reset to first page
    window.location.href = `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0',
        className,
      )}
    >
      {/* Page Info */}
      {showPageInfo && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {Math.min((page - 1) * limit + 1, total)} to {Math.min(page * limit, total)} of{' '}
          {total} results
        </div>
      )}

      {/* Page Size Selector */}
      {showPageSize && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
          <select
            value={limit}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-primary-400 dark:focus:ring-primary-400"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
        </div>
      )}

      {/* Pagination Navigation (前端分页) */}
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous Page */}
        {page > 1 && onPageChange && (
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          <div key={index}>
            {pageNum === '...' ? (
              <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                ...
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onPageChange && onPageChange(pageNum as number)}
                className={cn(
                  'inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  pageNum === page
                    ? 'border-primary-500 bg-primary-600 text-white shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                )}
                disabled={pageNum === page}
              >
                {pageNum}
              </button>
            )}
          </div>
        ))}

        {/* Next Page */}
        {page < totalPages && onPageChange && (
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-primary-400"
          >
            Next
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </nav>
    </div>
  );
}
