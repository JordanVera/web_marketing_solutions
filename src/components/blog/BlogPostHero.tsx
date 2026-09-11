import Link from 'next/link';
import { Clock } from 'lucide-react';
import { NebulaBackdrop } from '@/components/services/NebulaBackdrop';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/lib/content';
import { formatBlogDate, type BlogPost } from '@/lib/blog';

const CATEGORY_TONE: Record<BlogPost['category'], string> = {
  SEO: 'text-aurora-300 border-aurora/30 bg-aurora/10',
  'Web Development': 'text-electric-300 border-electric/30 bg-electric/10',
  Strategy: 'text-cream/90 border-white/15 bg-white/[0.06]',
  Apps: 'text-aurora-300 border-aurora/30 bg-aurora/10',
};

export function BlogPostHero({ post }: { post: BlogPost }) {
  return (
    <section className="relative px-5 pt-6 sm:px-6">
      <div className="relative mx-auto">
        <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] md:min-h-[32rem] md:rounded-[2rem]">
          <NebulaBackdrop
            src={post.heroImage}
            overlayClass={post.heroOverlay}
            sizes="(min-width: 768px) 80rem, 100vw"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(244,63,154,0.12),transparent_65%)]"
          />

          <div className="relative flex flex-col px-7 py-10 pb-16 sm:px-10 md:px-12 md:py-14 md:pb-20 lg:px-14 lg:py-16">
            <Reveal direction="up">
              <nav aria-label="Breadcrumb" className="text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-cream/55">
                  <li>
                    <Link href="/" className="transition-colors hover:text-cream">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/blog" className="transition-colors hover:text-cream">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="max-w-[14rem] truncate text-cream sm:max-w-xs" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal direction="up" delay={0.06}>
              <span className="mt-10 inline-flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-void/40 px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric uppercase backdrop-blur-sm">
                  {post.callsign} · {company.address.locality}
                </span>
                <span
                  className={`rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase backdrop-blur-sm ${CATEGORY_TONE[post.category]}`}
                >
                  {post.category}
                </span>
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.12}>
              <h1 className="text-heading mt-6 max-w-4xl font-semibold text-cream drop-shadow-[0_2px_18px_rgba(5,11,22,0.85)]">
                {post.title}
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.18}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
                {post.excerpt}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.24}>
              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.625rem] tracking-[0.16em] text-cream/60 uppercase">
                <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.author}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {post.readTimeMinutes} min read
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
