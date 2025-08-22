import { format } from 'date-fns';
import { Calendar, Tag, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostBySlug, getPostsMeta } from '@/lib/posts';
import { cn, responsive, spacing } from '@/lib/styles';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getPostsMeta();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={cn(responsive.container, spacing.section)}>
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>

        {/* Article Header */}
        <article className="mb-8">
          {/* Category */}
          {post.category && (
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h1>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{format(new Date(post.date), 'yyyy-MM-dd')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex items-center space-x-2">
              <Tag size={16} className="text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </div>
    </div>
  );
}
