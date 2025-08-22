import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import type { PostMeta } from '@/types/post';

interface HomeHeroProps {
  posts: PostMeta[];
}

export default function HomeHero({ posts }: HomeHeroProps) {
  if (!posts || posts.length === 0) return null;

  const featured = posts.filter((p) => p.featured);
  const hero = (featured.length > 0 ? featured : posts)[0];
  const side = (featured.length > 0 ? featured.slice(1) : posts.slice(1)).slice(0, 2);

  return (
    <section className="mb-16">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left hero - Static display with frosted background */}
        <Link
          href={`/posts/${hero.slug}`}
          className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 p-8 text-white shadow-2xl lg:col-span-2"
        >
          {/* Cover image (if provided) */}
          {hero.coverImage && (
            <div className="absolute inset-0">
              <Image
                src={hero.coverImage}
                alt={hero.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width:1024px) 66vw, 100vw"
              />
              {/* Dim overlay to ensure text readability while keeping transparency */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          )}

          {/* Stronger frosted glass + gradient to reduce contrast and blend with theme */}
          <div className="backdrop-brightness-70 pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25 backdrop-blur-md backdrop-contrast-75 lg:backdrop-blur-xl" />

          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm">
              {hero.category || 'Release'}
            </div>

            <div className="mb-16">
              <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {hero.title}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-white/90">{hero.excerpt}</p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-white/80">
              <span>{format(new Date(hero.date), 'MMM dd, yyyy')}</span>
            </div>
          </div>

          {/* No hover overlay for hero; keep static presentation */}
        </Link>

        {/* Right side list - Enhanced with better spacing and interactions */}
        <div className="flex flex-col space-y-6">
          {side.map((p) => {
            const categoryInfo = p.category ? siteConfig.categories.definitions[p.category] : null;
            return (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="group rounded-2xl bg-gradient-to-br from-white to-primary-50 p-6 text-primary-900 ring-1 ring-primary-100 transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-primary-50 hover:to-primary-100 hover:shadow-lg hover:ring-2 hover:ring-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 dark:text-primary-100 dark:ring-primary-800 dark:hover:from-primary-800/40 dark:hover:to-primary-700/30 dark:hover:ring-primary-600"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary-600/70 dark:text-primary-300/70">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-600">
                    {categoryInfo && (
                      <span className={`mr-1.5 ${categoryInfo.iconColor}`}>
                        {categoryInfo.icon}
                      </span>
                    )}
                    {categoryInfo?.label || p.category}
                  </span>
                </div>
                <div className="mb-3 line-clamp-2 text-lg font-semibold leading-tight text-primary-900 group-hover:text-primary-700 dark:text-primary-100 dark:group-hover:text-primary-200">
                  {p.title}
                </div>
                <div className="mb-4 line-clamp-2 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/80">
                  {p.excerpt}
                </div>
                <div className="text-xs font-medium text-primary-600/70 dark:text-primary-300/70">
                  {format(new Date(p.date), 'MMM dd, yyyy')}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
