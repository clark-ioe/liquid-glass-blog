import { Metadata } from 'next';

import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/posts';
import { cn, responsive, spacing } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'Categories - LiquidGlass Blog',
  description: 'Browse all article categories by topic, find content you are interested in',
  keywords: 'categories,topics,article categories,technology categories,tutorial categories',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className={cn(responsive.container, spacing.section)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text pb-1 text-5xl font-bold leading-[1.15] tracking-tight text-transparent dark:from-primary-400 dark:to-accent-400 sm:text-6xl sm:leading-[1.1]">
              Article Categories
            </h1>
          </div>

          {/* Featured Categories */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 dark:from-primary-900 dark:to-accent-900">
                Main Categories
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard key={category.slug} category={category} variant="featured" />
              ))}
            </div>
          </div>

          {/* All Categories */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 dark:from-gray-700 dark:to-gray-600">
                All Categories
              </span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} variant="default" />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-8 rounded-full bg-white px-8 py-4 shadow-lg dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-primary-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {categories.length} Categories
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-accent-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {categories.reduce((sum, cat) => sum + cat.postCount, 0)} Articles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
