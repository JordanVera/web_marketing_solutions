import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { blogPath, formatBlogDate, type BlogPost } from '@/lib/blog';

export function RelatedPosts({
  posts,
  currentSlug,
}: {
  posts: BlogPost[];
  currentSlug: string;
}) {
  const related = posts.filter((post) => post.slug !== currentSlug).slice(0, 2);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="container-shell">
        <SectionHeading
          align="left"
          eyebrow="More dispatches"
          title={
            <>
              Keep reading{' '}
              <span className="text-electric">mission logs</span>
            </>
          }
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {related.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={blogPath(post.slug)}
                className="group border-gradient flex h-full flex-col rounded-2xl bg-navy/40 p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 md:p-8"
              >
                <p className="font-mono text-[0.625rem] tracking-[0.16em] text-muted-dim uppercase">
                  {post.category} · {formatBlogDate(post.publishedAt)}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-cream">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-cream">
                  Read post
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal direction="up" className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-cream"
          >
            View all posts
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
