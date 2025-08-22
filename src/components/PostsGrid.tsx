'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import { siteConfig } from '@/lib/config';
import type { PostMeta, Pagination as PaginationType } from '@/types/post';

interface PostsGridProps {
  posts: PostMeta[];
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function PostsGrid({ posts, variant = 'default' }: PostsGridProps) {
  const searchParams = useSearchParams();
  const defaultLimit = siteConfig.content.pagination.defaultPageSize;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || String(defaultLimit), 10);

  const { pageItems, pagination }: { pageItems: PostMeta[]; pagination: PaginationType } =
    useMemo(() => {
      const total = posts.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const startIndex = (safePage - 1) * limit;
      const endIndex = startIndex + limit;
      return {
        pageItems: posts.slice(startIndex, endIndex),
        pagination: { page: safePage, limit, total, totalPages },
      };
    }, [posts, page, limit]);

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((post) => (
          <PostCard key={post.slug} post={post} variant={variant} />
        ))}
      </div>
      <div className="mt-12">
        <Pagination pagination={pagination} showPageSize={true} />
      </div>
    </div>
  );
}
