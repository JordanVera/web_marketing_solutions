import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { BlogCard } from '@/components/blog/BlogCard';
import { CTA } from '@/components/CTA';
import { Button } from '@/components/ui/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { company } from '@/lib/content';
import { blogHub, blogPath, getSortedBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: blogHub.metaTitle,
  description: blogHub.metaDescription,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: blogHub.metaTitle,
    description: blogHub.metaDescription,
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogHub.metaTitle,
    description: blogHub.metaDescription,
  },
};

const hubStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      name: `${company.name} Blog`,
      description: blogHub.metaDescription,
      url: `${SITE_URL}/blog`,
      publisher: {
        '@type': 'Organization',
        name: company.name,
        url: SITE_URL,
      },
    },
    {
      '@type': 'ItemList',
      name: 'Latest blog posts',
      numberOfItems: getSortedBlogPosts().length,
      itemListElement: getSortedBlogPosts().map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `${SITE_URL}${blogPath(post.slug)}`,
      })),
    },
  ],
};

export default function BlogPage() {
  const posts = getSortedBlogPosts();
  const singlePost = posts.length === 1;

  return (
    <>
      <JsonLd data={hubStructuredData} />

      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(0,102,255,0.16),transparent_70%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_65%)] blur-3xl"
          />

          <div className="container-shell relative">
            <Reveal direction="up">
              <nav aria-label="Breadcrumb" className="text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-muted-dim">
                  <li>
                    <Link href="/" className="transition-colors hover:text-cream">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-cream" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
                Mission logs · {company.city}
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <h1 className="text-heading mt-6 max-w-3xl font-semibold">{blogHub.h1}</h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {blogHub.lede}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-white/[0.07] pb-20 md:pb-28">
          <div className="container-shell">
            {posts.length > 0 ? (
              singlePost ? (
                <Reveal direction="up">
                  <BlogCard post={posts[0]!} featured />
                </Reveal>
              ) : (
                <>
                  <Reveal direction="up">
                    <BlogCard post={posts[0]!} featured className="mb-8 md:mb-10" />
                  </Reveal>
                  {posts.length > 1 ? (
                    <Stagger className="grid gap-5 md:grid-cols-2">
                      {posts.slice(1).map((post) => (
                        <StaggerItem key={post.slug}>
                          <BlogCard post={post} />
                        </StaggerItem>
                      ))}
                    </Stagger>
                  ) : null}
                </>
              )
            ) : null}

            {posts.length === 0 ? (
              <Reveal direction="up">
                <div className="border-gradient rounded-2xl bg-navy/40 p-10 text-center">
                  <p className="text-lg text-muted">No dispatches filed yet. Check back soon.</p>
                  <div className="mt-8">
                    <Button href="/contact" variant="secondary">
                      Schedule a consultation
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
