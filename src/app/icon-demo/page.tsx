import { siteConfig } from '@/lib/config';
import { cn, responsive, spacing } from '@/lib/styles';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function IconDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900">
      <div className={cn(responsive.container, spacing.section)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-5xl font-bold text-transparent dark:from-primary-400 dark:to-accent-400">
              Icon Color System Demo
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-gray-400">
              Showcasing the unified monochrome icon color system for consistent visual design
            </p>
          </div>

          {/* Icon Color System Overview */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              Icon Color System
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(siteConfig.icons).map(([name, colorClass]) => (
                <div
                  key={name}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className={`mb-4 text-4xl ${colorClass}`}>🎨</div>
                  <h3 className="mb-2 text-lg font-semibold capitalize text-gray-900 dark:text-gray-100">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{colorClass}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category Icons with Colors */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              Category Icons with Unified Colors
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(siteConfig.categories.definitions).map(([name, category]) => (
                <div
                  key={name}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className={`mb-4 text-4xl ${category.iconColor}`}>{category.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {category.label}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Color: {category.iconColor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Principles */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
              Design Principles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  🎯 Visual Consistency
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All icons follow a unified color scheme that maintains visual harmony across the
                  entire interface.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  🌈 Semantic Meaning
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Each category has a distinct but harmonious color that helps users quickly
                  identify content types.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  🌙 Dark Mode Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Colors automatically adapt to light and dark themes for optimal readability and
                  aesthetics.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  🔧 Easy Customization
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Centralized configuration makes it simple to adjust colors and maintain
                  consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              💻 Implementation
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              The icon color system is implemented through centralized configuration in{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700">
                src/lib/site-config.ts
              </code>
              . Each category defines its icon and color class, which are then applied consistently
              across all components.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              This approach ensures that any changes to the color scheme are automatically reflected
              throughout the entire application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
