import { Metadata } from 'next';

import TagCloud from '@/components/TagCloud';
import { getTags } from '@/lib/posts';
import { cn, responsive, spacing } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'Tags - LiquidGlass Blog',
  description: 'Browse all article tags, discover related topics and content',
  keywords: 'tags,topic tags,article tags,technology tags',
};

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className={cn(responsive.container, spacing.section)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-8 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text pb-1 text-5xl font-bold leading-[1.15] tracking-tight text-transparent dark:from-primary-400 dark:to-accent-400 sm:text-6xl sm:leading-[1.1]">
              Article Tags
            </h1>
          </div>
          {/* Tag Cloud */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 dark:from-primary-900 dark:to-accent-900">
                Tag Cloud
              </span>
            </h2>
            <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
              <TagCloud tags={tags} variant="cloud" maxTags={100} className="justify-center" />
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 dark:from-gray-700 dark:to-gray-600">
                Popular Tags
              </span>
            </h2>
            <TagCloud tags={tags.slice(0, 20)} variant="default" maxTags={20} />
          </div>

          {/* All Tags */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 dark:from-gray-700 dark:to-gray-600">
                All Tags
              </span>
            </h2>
            <TagCloud tags={tags} variant="default" maxTags={50} />
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-8 rounded-full bg-white px-8 py-4 shadow-lg dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-primary-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{tags.length} Tags</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-accent-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tags.reduce((sum, tag) => sum + tag.postCount, 0)} Articles
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(
                    tags.reduce((sum, tag) => sum + tag.postCount, 0) / Math.max(tags.length, 1),
                  )}{' '}
                  Articles/Tag
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
