import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PostsGrid from '@/components/PostsGrid';
import { siteConfig } from '@/lib/config';
import { getTags, getPostsByTag } from '@/lib/posts';
import { cn, responsive, spacing } from '@/lib/styles';
import type { PostMeta } from '@/types/post';

interface TagPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === params.slug);

  if (!tag) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `#${tag.name} - ${siteConfig.site.name}`,
    description: `Articles tagged with "${tag.name}"`,
    keywords: [tag.name, 'tag', 'articles', ...siteConfig.seo.defaultKeywords],
  };
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === params.slug);

  if (!tag) {
    notFound();
  }

  const tagPosts: PostMeta[] = getPostsByTag(tag.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className={cn(responsive.container, spacing.section)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6 flex items-center justify-center space-x-3">
              <span className="text-4xl text-primary-600 dark:text-primary-400">🏷️</span>
              <h1 className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-5xl font-bold text-transparent dark:from-primary-400 dark:to-accent-400">
                #{tag.name}
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-gray-400">
              Discover all articles tagged with &ldquo;{tag.name}&rdquo;
            </p>
          </div>

          {/* Articles Grid */}
          {tagPosts.length > 0 ? (
            <div className="mb-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
                <span className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 dark:from-primary-900 dark:to-accent-900">
                  Articles tagged with #{tag.name}
                </span>
              </h2>
              <PostsGrid posts={tagPosts} />
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
                No articles yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                We haven&apos;t published any articles with this tag yet. Check back soon!
              </p>
            </div>
          )}

          {/* Related Tags */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 dark:from-gray-700 dark:to-gray-600">
                Related Tags
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {tags
                .filter((t) => t.slug !== params.slug)
                .slice(0, 8)
                .map((relatedTag) => (
                  <a
                    key={relatedTag.slug}
                    href={`/tags/${relatedTag.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/30"
                  >
                    <div className="mb-2 text-2xl text-primary-600 dark:text-primary-400">🏷️</div>
                    <div className="mb-1 font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                      #{relatedTag.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {relatedTag.postCount} articles
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
