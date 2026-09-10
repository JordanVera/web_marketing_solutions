import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/services/FaqList";
import { company, projects } from "@/lib/content";
import {
  getRelatedServices,
  servicePath,
  type ServicePage as ServicePageData,
} from "@/lib/services";
import { SITE_URL, cn } from "@/lib/utils";

export function ServicePage({ service }: { service: ServicePageData }) {
  const Icon = service.icon;
  const related = getRelatedServices(service);
  const relatedWork = service.relatedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  const canonical = `${SITE_URL}${servicePath(service.slug)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        url: canonical,
        areaServed: [
          { "@type": "City", name: "Houston" },
          { "@type": "State", name: "Texas" },
        ],
        provider: {
          "@type": "ProfessionalService",
          name: company.name,
          url: SITE_URL,
          telephone: company.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.street,
            addressLocality: company.address.locality,
            addressRegion: company.address.region,
            postalCode: company.address.postalCode,
            addressCountry: company.address.country,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: service.shortTitle, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(0,102,255,0.16),transparent_70%)]"
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
                  <li>
                    <Link href="/services" className="transition-colors hover:text-cream">
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-cream" aria-current="page">
                    {service.shortTitle}
                  </li>
                </ol>
              </nav>
            </Reveal>

            <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <Reveal direction="up" delay={0.06}>
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {service.title}
                  </span>
                </Reveal>

                <Reveal direction="up" delay={0.12}>
                  <h1 className="text-heading mt-6 font-semibold">{service.h1}</h1>
                </Reveal>

                <Reveal direction="up" delay={0.18}>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{service.lede}</p>
                </Reveal>

                <Reveal direction="up" delay={0.24}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                    <Button href="#contact" size="lg">
                      Start Your Launch
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                    <Button href="/services" variant="secondary" size="lg">
                      All services
                    </Button>
                  </div>
                </Reveal>
              </div>

              <Reveal direction="up" delay={0.2} className="lg:col-span-4">
                <aside className="border-gradient rounded-2xl bg-navy/50 p-6 md:p-7">
                  <p className="font-mono text-[0.625rem] tracking-[0.22em] text-electric-300 uppercase">
                    In this engagement
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {service.capabilities.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-cream">
                        <Check className="size-4 shrink-0 text-electric-300" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow="Who it's for"
              title={
                <>
                  Built for teams who have outgrown the <span className="text-gradient">workaround</span>
                </>
              }
            />
            <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
              {service.whoItsFor.map((block) => (
                <StaggerItem key={block.title}>
                  <article className="h-full rounded-2xl border border-white/[0.08] bg-navy/40 p-6 md:p-7">
                    <h3 className="text-lg font-semibold tracking-tight text-cream">{block.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{block.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_0%,rgba(124,58,237,0.12),transparent_60%)]"
          />
          <div className="container-shell relative">
            <SectionHeading
              align="left"
              eyebrow="The problems"
              title={
                <>
                  What we are usually <span className="text-gradient">hired to end</span>
                </>
              }
            />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {service.problems.map((block, index) => (
                <Reveal key={block.title} direction="up" delay={index * 0.08}>
                  <article>
                    <span className="font-mono text-xs tracking-[0.2em] text-electric-300">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-cream">
                      {block.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{block.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow="What's included"
              title={
                <>
                  Deliverables, not a <span className="text-gradient">mystery retainer</span>
                </>
              }
            />
            <Reveal direction="up" className="mt-14">
              <ul className="grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 text-sm text-cream"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-electric-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow="How we deliver"
              title={
                <>
                  A flight plan for this <span className="text-gradient">service line</span>
                </>
              }
            />
            <ol className="mt-14 grid gap-5 md:grid-cols-2">
              {service.process.map((step, index) => (
                <Reveal key={step.title} direction="up" delay={index * 0.06} as="li">
                  <article className="h-full rounded-2xl border border-white/[0.08] bg-navy/40 p-6 md:p-8">
                    <span className="font-mono text-[0.625rem] tracking-[0.22em] text-electric-300 uppercase">
                      Step 0{index + 1}
                    </span>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-cream">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow="Why this studio"
              title={
                <>
                  How this work is <span className="text-gradient">different here</span>
                </>
              }
            />
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {service.differentiators.map((block, index) => (
                <Reveal key={block.title} direction="up" delay={index * 0.08}>
                  <article className="border-gradient h-full rounded-2xl bg-navy/40 p-6 md:p-7">
                    <h3 className="text-lg font-semibold tracking-tight text-cream">{block.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{block.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal direction="up" className="mt-10">
              <p className="max-w-3xl text-sm leading-relaxed text-muted-dim">{service.geo}</p>
            </Reveal>
          </div>
        </section>

        {relatedWork.length > 0 && (
          <section className="relative py-20 md:py-28">
            <div className="container-shell">
              <SectionHeading
                align="left"
                eyebrow="Related work"
                title={
                  <>
                    Missions in this <span className="text-gradient">neighborhood</span>
                  </>
                }
              />
              <div
                className={cn(
                  "mt-14 grid gap-6",
                  relatedWork.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
                )}
              >
                {relatedWork.map((project) => {
                  const isVector = project.image.endsWith(".svg");
                  return (
                    <Reveal key={project.id} direction="up">
                      <article className="group h-full">
                        <Link
                          href={project.href}
                          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-navy/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-electric/35"
                        >
                          <div className="relative aspect-4/3 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={`${project.title} — ${project.category} case study`}
                              fill
                              unoptimized={isVector}
                              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                            <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-void/70 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.16em] text-cream uppercase backdrop-blur-sm">
                              {project.category}
                            </span>
                            <span className="absolute bottom-4 left-4 font-display text-sm font-semibold text-electric-300">
                              {project.metric}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <h3 className="text-lg font-semibold tracking-tight text-cream">
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

        <section className="relative py-20 md:py-28">
          <div className="container-shell">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                <>
                  Questions we hear before <span className="text-gradient">kickoff</span>
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
              eyebrow="Related services"
              title={
                <>
                  Adjacent work, same <span className="text-gradient">studio</span>
                </>
              }
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {related.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <Reveal key={item.slug} direction="up">
                    <Link
                      href={servicePath(item.slug)}
                      className="group border-gradient flex h-full flex-col rounded-2xl bg-navy/40 p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5"
                    >
                      <span className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                        <RelatedIcon className="size-5 text-electric-300" aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 text-xl font-semibold tracking-tight text-cream">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                        {item.navDescription}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-cream">
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
