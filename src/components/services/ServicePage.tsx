import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CTA } from '@/components/CTA';
import { Atmosphere } from '@/components/ui/Atmosphere';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { FaqList } from '@/components/services/FaqList';
import { ServiceHero } from '@/components/services/ServiceHero';
import { AudienceBento } from '@/components/services/AudienceBento';
import { ProblemRail } from '@/components/services/ProblemRail';
import { GoConsole } from '@/components/services/GoConsole';
import { ProcessRail } from '@/components/services/ProcessRail';
import { LongformSections } from '@/components/services/LongformSections';
import { FlightCheckCta } from '@/components/services/FlightCheckCta';
import { NebulaBackdrop } from '@/components/services/NebulaBackdrop';
import { missionEyebrow, SERVICE_THEME } from '@/components/services/theme';
import { company, isExternalHref, projects } from '@/lib/content';
import {
  getRelatedServices,
  servicePath,
  type ServicePage as ServicePageData,
} from '@/lib/services';
import { SITE_URL, cn } from '@/lib/utils';

function numberHeadings(service: ServicePageData, hasRelatedWork: boolean) {
  let index = 1;
  const next = (label: string) => missionEyebrow(index++, label);

  return {
    audience: next(service.sections.audience.eyebrow),
    problems: next(service.sections.problems.eyebrow),
    deliverables: next(service.sections.deliverables.eyebrow),
    delivery: next(service.sections.delivery.eyebrow),
    longform: service.longform.map((section) => next(section.eyebrow)),
    whyUs: next(service.sections.whyUs.eyebrow),
    relatedWork: hasRelatedWork
      ? next(service.sections.relatedWork.eyebrow)
      : null,
    faq: next(service.sections.faq.eyebrow),
    related: next(service.sections.related.eyebrow),
  };
}

export function ServicePage({ service }: { service: ServicePageData }) {
  const theme = SERVICE_THEME[service.slug];
  const related = getRelatedServices(service);
  const relatedWork = service.relatedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] =>
      Boolean(project),
    );

  const headings = numberHeadings(service, relatedWork.length > 0);
  const canonical = `${SITE_URL}${servicePath(service.slug)}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        url: canonical,
        areaServed: [
          { '@type': 'City', name: 'Houston' },
          { '@type': 'State', name: 'Texas' },
        ],
        provider: {
          '@type': 'ProfessionalService',
          name: company.name,
          url: SITE_URL,
          telephone: company.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: company.address.street,
            addressLocality: company.address.locality,
            addressRegion: company.address.region,
            postalCode: company.address.postalCode,
            addressCountry: company.address.country,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${SITE_URL}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.shortTitle,
            item: canonical,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <main id="main">
        <ServiceHero service={service} />
        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow={headings.audience}
              title={
                <>
                  {service.sections.audience.title}{' '}
                  <span className="text-electric">
                    {service.sections.audience.accent}
                  </span>
                </>
              }
            />
            <AudienceBento items={service.whoItsFor} />
          </div>
        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="container-shell relative">
            <SectionHeading
              align="left"
              eyebrow={headings.problems}
              title={
                <>
                  {service.sections.problems.title}{' '}
                  <span className="text-electric">
                    {service.sections.problems.accent}
                  </span>
                </>
              }
            />
            <ProblemRail
              items={service.problems}
              atmosphere={theme.atmosphere}
            />
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <SectionHeading
                align="left"
                className="lg:col-span-5"
                eyebrow={headings.deliverables}
                title={
                  <>
                    {service.sections.deliverables.title}{' '}
                    <span className="text-electric">
                      {service.sections.deliverables.accent}
                    </span>
                  </>
                }
              />
              <Reveal direction="up" className="lg:col-span-7">
                <GoConsole items={service.deliverables} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <Atmosphere variant={theme.atmosphere} className="opacity-40" />
          <div className="container-shell relative">
            <SectionHeading
              align="left"
              eyebrow={headings.delivery}
              title={
                <>
                  {service.sections.delivery.title}{' '}
                  <span className="text-electric">
                    {service.sections.delivery.accent}
                  </span>
                </>
              }
            />
            <ProcessRail steps={service.process} />
          </div>
        </section>

        <LongformSections
          sections={service.longform}
          eyebrows={headings.longform}
        />

        <FlightCheckCta
          title={service.primaryCta}
          action={service.secondaryCta}
        />

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow={headings.whyUs}
              title={
                <>
                  {service.sections.whyUs.title}{' '}
                  <span className="text-electric">
                    {service.sections.whyUs.accent}
                  </span>
                </>
              }
            />
            <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
              {service.differentiators.map((block, index) => (
                <StaggerItem key={block.title}>
                  <article className="border-gradient glass-panel relative h-full overflow-hidden rounded-2xl p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase">
                        SYS-{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-aurora-300 uppercase">
                        <StatusDot />
                        Nominal
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-cream">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {block.body}
                    </p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal direction="up" className="mt-10">
              <p className="max-w-3xl font-mono text-[0.6875rem] leading-relaxed tracking-[0.08em] text-muted-dim uppercase">
                {service.geo}
              </p>
            </Reveal>
          </div>
        </section>

        {relatedWork.length > 0 && headings.relatedWork && (
          <section className="relative py-20 md:py-28">
            <div className="container-shell">
              <SectionHeading
                align="left"
                eyebrow={headings.relatedWork}
                title={
                  <>
                    {service.sections.relatedWork.title}{' '}
                    <span className="text-electric">
                      {service.sections.relatedWork.accent}
                    </span>
                  </>
                }
              />
              <div
                className={cn(
                  'mt-14 grid gap-6',
                  relatedWork.length >= 3
                    ? 'md:grid-cols-2 lg:grid-cols-3'
                    : 'mx-auto max-w-5xl md:grid-cols-2',
                )}
              >
                {relatedWork.map((project, index) => {
                  const isVector = project.image.endsWith('.svg');
                  const isExternal = isExternalHref(project.href);
                  return (
                    <Reveal key={project.id} direction="up">
                      <article className="group h-full">
                        <Link
                          href={project.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          aria-label={
                            isExternal
                              ? `${project.title} (opens in a new tab)`
                              : undefined
                          }
                          className="border-gradient glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-1.5 motion-reduce:transform-none"
                        >
                          <div className="relative aspect-4/3 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.imageAlt}
                              fill
                              unoptimized={isVector}
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/20 to-transparent" />
                            <span className="absolute top-4 left-4 font-mono text-[0.625rem] tracking-[0.2em] text-cream uppercase">
                              LOG-{String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="absolute bottom-4 left-4 font-display text-sm font-semibold text-electric-300">
                              {project.metric}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <p className="font-mono text-[0.625rem] tracking-[0.18em] text-muted-dim uppercase">
                              {project.category}
                            </p>
                            <h3 className="mt-2 text-lg font-semibold tracking-tight text-cream">
                              {project.title}
                            </h3>
                            <p className="mt-2.5 text-sm leading-relaxed text-muted">
                              {project.description}
                            </p>
                          </div>
                        </Link>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="relative overflow-hidden py-20 md:py-28">
          <Atmosphere variant="cyan" className="opacity-50" />
          <div className="container-shell relative">
            <SectionHeading
              align="left"
              eyebrow={headings.faq}
              title={
                <>
                  {service.sections.faq.title}{' '}
                  <span className="text-electric">
                    {service.sections.faq.accent}
                  </span>
                </>
              }
            />
            <Reveal direction="up" className="mt-14">
              <FaqList faqs={service.faqs} />
            </Reveal>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow={headings.related}
              title={
                <>
                  {service.sections.related.title}{' '}
                  <span className="text-electric">
                    {service.sections.related.accent}
                  </span>
                </>
              }
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {related.map((item) => {
                const relatedTheme = SERVICE_THEME[item.slug];
                return (
                  <Reveal key={item.slug} direction="up">
                    <Link
                      href={servicePath(item.slug)}
                      className="group border-gradient glass-panel relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 motion-reduce:transform-none"
                    >
                      <NebulaBackdrop
                        src={relatedTheme.src}
                        imageClass={relatedTheme.imageClass}
                        overlayClass={relatedTheme.cardOverlay}
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      <h3 className="relative z-10 text-xl font-semibold tracking-tight text-cream drop-shadow-[0_2px_14px_rgba(5,11,22,0.85)]">
                        {item.title}
                      </h3>
                      <p className="relative z-10 mt-3 flex-1 text-[0.9375rem] leading-relaxed text-cream/75 drop-shadow-[0_2px_12px_rgba(5,11,22,0.9)]">
                        {item.navDescription}
                      </p>
                      <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-electric uppercase">
                        View service
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
