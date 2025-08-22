import { Inter } from 'next/font/google';

import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import { siteConfig } from '@/lib/config';
import { getPostsMeta } from '@/lib/posts';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.defaultKeywords,
  authors: [{ name: siteConfig.site.author }],
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    type: siteConfig.seo.openGraph.type as 'website',
    url: '/',
    siteName: siteConfig.seo.openGraph.siteName,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: siteConfig.seo.defaultTitle,
      },
    ],
  },
  twitter: {
    card: siteConfig.seo.twitter.card as 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = getPostsMeta();
  return (
    <html lang={siteConfig.site.language}>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <ScrollProgress />
          <Header posts={posts} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
