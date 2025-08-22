'use client';

import { useState, useEffect } from 'react';

import { Menu, X, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

import SearchDialog from '@/components/SearchDialog';
import { siteConfig } from '@/lib/config';
import { cn, responsive } from '@/lib/styles';
import type { PostMeta } from '@/types/post';

export default function Header({ posts }: { posts: PostMeta[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);

    // Read from localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // Apply saved theme
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Fallback to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Avoid SSR flash of unstyled content
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md">
        <div className={cn(responsive.container)}>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              {siteConfig.site.name}
            </Link>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-200 dark:border-gray-700 dark:bg-gray-900/80">
      <div className={cn(responsive.container)}>
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo with better branding */}
          <Link
            href="/"
            className="group flex items-center space-x-2 text-2xl font-bold text-primary-600 transition-all duration-300 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              {siteConfig.site.name.charAt(0)}
            </div>
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {siteConfig.site.name}
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {siteConfig.navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Enhanced Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden items-center space-x-3 md:flex">
              <SearchDialog posts={posts} />
              <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {siteConfig.search.keyboardShortcuts.open}
              </span>
            </div>
            <div className="md:hidden">
              <SearchDialog posts={posts} />
            </div>

            {/* Enhanced Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group rounded-lg p-2.5 text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 hover:shadow-md dark:text-gray-300 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 dark:hover:text-primary-400"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun
                  size={20}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              ) : (
                <Moon
                  size={20}
                  className="transition-transform duration-300 group-hover:-rotate-12"
                />
              )}
            </button>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2.5 text-gray-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-600 hover:shadow-md dark:text-gray-300 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 dark:hover:text-primary-400 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={20} className="transition-transform duration-300" />
              ) : (
                <Menu size={20} className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <nav className="border-t border-gray-200 bg-white/95 py-6 backdrop-blur-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/95 md:hidden">
            <div className="flex flex-col space-y-4">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 hover:shadow-sm dark:text-gray-300 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
