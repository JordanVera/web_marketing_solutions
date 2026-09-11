import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  blogPath,
  formatBlogDate,
  type BlogPost,
} from '@/lib/blog';
import { cn } from '@/lib/utils';

const CATEGORY_TONE: Record<BlogPost['category'], string> = {
  SEO: 'text-aurora-300 border-aurora/30 bg-aurora/10',
  'Web Development': 'text-electric-300 border-electric/30 bg-electric/10',
  Strategy: 'text-cream/90 border-white/15 bg-white/[0.06]',
  Apps: 'text-aurora-300 border-aurora/30 bg-aurora/10',
};

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
  className?: string;
};

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <Link
      href={blogPath(post.slug)}
      className={cn(
        'group border-gradient flex h-full flex-col overflow-hidden rounded-2xl bg-navy/40 transition-transform duration-500 ease-out hover:-translate-y-1.5',
        featured && 'md:grid md:grid-cols-2 md:items-stretch',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'min-h-56 md:min-h-full' : 'aspect-[16/10]',
        )}
      >
        <Image
          src={post.heroImage}
          alt={post.heroImageAlt}
          fill
          sizes={
            featured
              ? '(min-width: 768px) 50vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-void/80 via-void/20 to-transparent"
        />
        <span
          className={cn(
            'absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[0.625rem] tracking-[0.18em] uppercase',
            CATEGORY_TONE[post.category],
          )}
        >
          {post.category}
        </span>
      </div>

      <div className={cn('flex flex-1 flex-col p-6 md:p-7', featured && 'md:p-8')}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] tracking-[0.16em] text-muted-dim uppercase">
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {post.readTimeMinutes} min read
          </span>
        </p>

        <h2
          className={cn(
            'mt-4 font-semibold tracking-tight text-cream',
            featured ? 'text-2xl md:text-3xl' : 'text-xl',
          )}
        >
          {post.title}
        </h2>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-[0.9375rem]">
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-cream">
          Read dispatch
          <ArrowUpRight
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
