'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';

import { Search, X, Clock, Tag, Calendar } from 'lucide-react';

import { siteConfig } from '@/lib/config';
import { debounce } from '@/lib/utils';
import type { PostMeta } from '@/types/post';

interface SearchDialogProps {
  posts: PostMeta[];
}

export default function SearchDialog({ posts }: { posts: PostMeta[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/';
      if (isCmdK || (isSlash && !open)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      // focus input after open
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery('');
      setHasSearched(false);
    }
  }, [open]);

  const searchPosts = useCallback(
    (searchQuery: string, maxResults: number = siteConfig.search.maxResults): PostMeta[] => {
      if (!searchQuery.trim()) return [];
      const searchLower = searchQuery.toLowerCase();
      const searchResults = posts
        .map((post) => {
          let score = 0;
          if (post.title.toLowerCase().includes(searchLower)) score += 10;
          if (post.excerpt.toLowerCase().includes(searchLower)) score += 5;
          if (post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))) score += 3;
          if (post.category?.toLowerCase().includes(searchLower)) score += 2;
          return { post, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults)
        .map((item) => item.post);
      return searchResults;
    },
    [posts],
  );

  const results = useMemo(() => {
    if (query.length < siteConfig.search.minQueryLength) return [];
    return searchPosts(query, siteConfig.search.maxResults);
  }, [query, searchPosts]);

  const debouncedMarkSearched = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length < siteConfig.search.minQueryLength) {
          setHasSearched(false);
          return;
        }
        setHasSearched(true);
      }, 150),
    [],
  );

  useEffect(() => {
    debouncedMarkSearched(query);
  }, [query, debouncedMarkSearched]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group rounded-lg p-2.5 text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 hover:shadow-md dark:text-gray-300 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 dark:hover:text-primary-400"
        aria-label="Open search"
        title={`Search (${siteConfig.search.keyboardShortcuts.open})`}
      >
        <Search size={20} className="transition-transform duration-300 group-hover:scale-110" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* Enhanced backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Enhanced dialog with better animations */}
          <div className="absolute inset-x-0 top-16 mx-auto w-[92%] max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95 sm:top-24">
            {/* Enhanced header */}
            <div className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
              <div className="mx-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                <Search size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags, or categories..."
                className="flex-1 bg-transparent py-3 text-base text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
                aria-label="Search articles"
              />
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Enhanced results with better visual hierarchy */}
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((post, index) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      onClick={() => setOpen(false)}
                      className="group block rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-primary-200 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-accent-50/50 hover:shadow-md dark:hover:border-primary-700 dark:hover:from-primary-900/20 dark:hover:to-accent-900/20"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="mb-2 font-semibold text-gray-900 transition-colors duration-200 group-hover:text-primary-700 dark:text-gray-100 dark:group-hover:text-primary-300">
                        {post.title}
                      </div>
                      <div className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </div>

                      {/* Enhanced meta information */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          {post.category && (
                            <div className="flex items-center space-x-1">
                              <Tag size={14} className="text-gray-400" />
                              <span className="font-medium">{post.category}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <Clock size={14} className="text-gray-400" />
                            <span className="font-medium">{post.readingTime} min read</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="font-medium">
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Enhanced read more indicator */}
                        <span className="text-sm font-semibold text-primary-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-primary-400">
                          Read →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : hasSearched ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    No articles found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try different keywords or check our categories
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                    <Search size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Start typing to search
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Search through {posts.length} articles by title, content, or tags
                  </p>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                    <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
                      {siteConfig.search.keyboardShortcuts.open}
                    </span>
                    <span>to open search</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
