import { Suspense } from 'react';

import HomeHero from '@/components/home/HomeHero';
import HomeLatest from '@/components/home/HomeLatest';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getPostsMeta } from '@/lib/posts';

export default async function HomePage() {
  const posts = getPostsMeta();

  // Create pagination for HomeLatest component
  const pagination = {
    page: 1,
    limit: 9,
    total: posts.length,
    totalPages: Math.ceil(posts.length / 9),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <HomeHero posts={posts} />
        </Suspense>

        {/* Latest Articles Section with Category Tabs */}
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <HomeLatest posts={posts} pagination={pagination} />
        </Suspense>
      </div>
    </main>
  );
}
