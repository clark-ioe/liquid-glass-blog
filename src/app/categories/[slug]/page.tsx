import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PostsGrid from '@/components/PostsGrid';
import { siteConfig } from '@/lib/config';
import { getCategories, getPostsByCategory } from '@/lib/posts';
import { cn, responsive, spacing } from '@/lib/styles';
import type { PostMeta } from '@/types/post';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - ${siteConfig.site.name}`,
    description: category.description,
    keywords: [category.name, 'category', 'articles', ...siteConfig.seo.defaultKeywords],
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories();
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  const categoryPosts: PostMeta[] = getPostsByCategory(category.name);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className={cn(responsive.container, spacing.section)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6 flex items-center justify-center space-x-3">
              <span className={`text-4xl ${category.iconColor}`}>{category.icon}</span>
              <h1 className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-5xl font-bold text-transparent dark:from-primary-400 dark:to-accent-400">
                {category.name}
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-gray-400">
              {category.description}
            </p>
          </div>

          {/* Articles Grid */}
          {categoryPosts.length > 0 ? (
            <div className="mb-16">
              <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
                <span className="inline-block rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 dark:from-primary-900 dark:to-accent-900">
                  Articles in {category.name}
                </span>
              </h2>
              <PostsGrid posts={categoryPosts} />
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
                We haven&apos;t published any articles in this category yet. Check back soon!
              </p>
            </div>
          )}

          {/* Related Categories */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-gray-100">
              <span className="inline-block rounded-full bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 dark:from-gray-700 dark:to-gray-600">
                Other Categories
              </span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categories
                .filter((cat) => cat.slug !== params.slug)
                .slice(0, 8)
                .map((cat) => (
                  <a
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-primary-900/30"
                  >
                    <div className={`mb-2 text-2xl ${cat.iconColor}`}>{cat.icon}</div>
                    <div className="mb-1 font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                      {cat.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {cat.postCount} articles
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
