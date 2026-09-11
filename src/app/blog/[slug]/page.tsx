import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { CTA } from '@/components/CTA';
import { company } from '@/lib/content';
import {
  blogImageAbsoluteUrl,
  blogPath,
  blogPosts,
  getBlogPostBySlug,
  getSortedBlogPosts,
  type BlogBlock,
} from '@/lib/blog';
import { SITE_URL } from '@/lib/utils';

type BlogPostRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}${blogPath(post.slug)}`;

  return {
    title: { absolute: `${post.metaTitle} | ${company.name}` },
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: blogPath(post.slug) },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: blogImageAbsoluteUrl(post.heroImage),
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [blogImageAbsoluteUrl(post.heroImage)],
    },
  };
}

function blocksToPlainText(blocks: BlogBlock[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
        case 'heading':
        case 'quote':
          return block.text;
        case 'list':
          return block.items.join(' ');
        case 'image':
          return block.alt;
        default:
          return '';
      }
    })
    .join(' ');
}

export default async function BlogPostPage({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}${blogPath(post.slug)}`;
  const bodyText = blocksToPlainText(post.blocks);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: blogImageAbsoluteUrl(post.heroImage),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          '@type': 'Organization',
          name: post.author,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: company.name,
          url: SITE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical,
        },
        articleBody: bodyText,
        keywords: post.tags.join(', '),
        wordCount: bodyText.split(/\s+/).length,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${SITE_URL}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <main id="main">
        <BlogPostHero post={post} />
        <BlogPostContent blocks={post.blocks} />
        <RelatedPosts posts={getSortedBlogPosts()} currentSlug={post.slug} />
        <CTA />
      </main>
    </>
  );
}
