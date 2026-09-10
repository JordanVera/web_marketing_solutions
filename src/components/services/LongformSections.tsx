import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { GoConsole } from '@/components/services/GoConsole';
import type { ServiceLongformSection } from '@/lib/services';
import { cn } from '@/lib/utils';

function firstSentence(text: string) {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text;
}

export function LongformSections({
  sections,
  eyebrows,
}: {
  sections: ServiceLongformSection[];
  eyebrows: string[];
}) {
  return (
    <>
      {sections.map((section, index) => {
        const hasBlocks = Boolean(section.blocks && section.blocks.length > 0);
        const hasItems = Boolean(section.items && section.items.length > 0);
        const editorial = Boolean(section.intro) && !hasBlocks && !hasItems;

        return (
          <section key={section.id} className="relative py-20 md:py-28">
            <div className="container-shell">
              <SectionHeading
                align="left"
                eyebrow={eyebrows[index] ?? section.eyebrow}
                title={
                  <>
                    {section.title}{' '}
                    <span className="text-electric">{section.accent}</span>
                  </>
                }
              />

              {editorial && section.intro ? (
                <EditorialIntro body={section.intro} />
              ) : null}

              {!editorial && section.intro ? (
                <Reveal direction="up" className="mt-10">
                  <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                    {section.intro}
                  </p>
                </Reveal>
              ) : null}

              {hasBlocks && section.blocks ? (
                <BlockBento blocks={section.blocks} />
              ) : null}

              {hasItems && section.items ? (
                <Reveal direction="up" className="mt-14">
                  <GoConsole items={section.items} label="Constraints" />
                </Reveal>
              ) : null}
            </div>
          </section>
        );
      })}
    </>
  );
}

function EditorialIntro({ body }: { body: string }) {
  const quote = firstSentence(body);

  return (
    <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal direction="up" className="lg:col-span-4">
        <blockquote className="border-l border-electric/50 pl-5">
          <p className="text-xl font-semibold tracking-tight text-cream md:text-2xl">
            {quote}
          </p>
        </blockquote>
      </Reveal>
      <Reveal direction="up" delay={0.08} className="lg:col-span-8">
        <p className="text-base leading-relaxed text-muted md:text-lg">
          {body}
        </p>
      </Reveal>
    </div>
  );
}

function BlockBento({
  blocks,
}: {
  blocks: NonNullable<ServiceLongformSection['blocks']>;
}) {
  const [featured, ...rest] = blocks;
  if (!featured) return null;

  const useFeatured = blocks.length >= 3;

  if (!useFeatured) {
    return (
      <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
        {blocks.map((block, index) => (
          <StaggerItem key={block.title}>
            <BlockCard block={block} index={index} />
          </StaggerItem>
        ))}
      </Stagger>
    );
  }

  return (
    <div className="mt-14 flex flex-col gap-5">
      <Reveal direction="up">
        <article className="border-gradient glass-panel rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transform-none md:flex md:items-start md:gap-10 md:p-8">
          <span className="font-mono text-[0.625rem] tracking-[0.22em] text-electric-300">
            01
          </span>
          <div className="mt-3 md:mt-0">
            <h3 className="text-xl font-semibold tracking-tight text-cream">
              {featured.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              {featured.body}
            </p>
          </div>
        </article>
      </Reveal>
      <Stagger
        className={cn(
          'grid gap-5',
          rest.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2',
        )}
      >
        {rest.map((block, index) => (
          <StaggerItem key={block.title}>
            <BlockCard block={block} index={index + 1} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function BlockCard({
  block,
  index,
}: {
  block: { title: string; body: string };
  index: number;
}) {
  return (
    <article className="border-gradient glass-panel h-full rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transform-none md:p-7">
      <span className="font-mono text-[0.625rem] tracking-[0.22em] text-electric-300">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-cream">
        {block.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
        {block.body}
      </p>
    </article>
  );
}
