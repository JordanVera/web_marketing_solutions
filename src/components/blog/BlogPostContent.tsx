import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { BlogBlock } from '@/lib/blog';

export function BlogPostContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <article className="container-shell max-w-3xl py-16 md:py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        {blocks.map((block, index) => (
          <Reveal key={`${block.type}-${index}`} direction="up" delay={index * 0.04}>
            <Block block={block} />
          </Reveal>
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
          {block.text}
        </p>
      );

    case 'heading':
      return (
        <h2 className="border-l border-electric/40 pl-5 text-2xl font-semibold tracking-tight text-cream md:text-3xl">
          {block.text}
        </h2>
      );

    case 'quote':
      return (
        <figure className="border-gradient rounded-2xl bg-navy/35 p-6 md:p-8">
          <blockquote className="text-xl font-semibold tracking-tight text-cream md:text-2xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-4 font-mono text-[0.625rem] tracking-[0.18em] text-muted-dim uppercase">
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );

    case 'list':
      return (
        <ul className="space-y-3 border-l border-white/10 pl-5">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-base leading-relaxed text-muted before:absolute before:top-[0.65em] before:-left-5 before:size-1.5 before:rounded-full before:bg-electric md:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    case 'image':
      return (
        <figure className="overflow-hidden rounded-2xl border border-white/10">
          <div className="relative aspect-[16/10]">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-void/50 via-transparent to-transparent"
            />
          </div>
          {block.caption ? (
            <figcaption className="border-t border-white/8 bg-navy/50 px-5 py-3 font-mono text-[0.625rem] tracking-[0.14em] text-muted-dim uppercase">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    default:
      return null;
  }
}
