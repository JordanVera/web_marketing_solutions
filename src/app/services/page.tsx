import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { servicePages, servicesHub, servicePath } from "@/lib/services";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: servicesHub.metaTitle,
  description: servicesHub.metaDescription,
  keywords: [...servicesHub.keywords],
  alternates: { canonical: "/services" },
  openGraph: {
    title: servicesHub.metaTitle,
    description: servicesHub.metaDescription,
    url: `${SITE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: servicesHub.metaTitle,
    description: servicesHub.metaDescription,
  },
};

const hubStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Marketing Solutions services",
  description: servicesHub.metaDescription,
  url: `${SITE_URL}/services`,
  numberOfItems: servicePages.length,
  itemListElement: servicePages.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_URL}${servicePath(service.slug)}`,
  })),
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={hubStructuredData} />

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
                  <li className="text-cream" aria-current="page">
                    Services
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal direction="up" delay={0.08}>
              <span className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
                Four service lines
              </span>
            </Reveal>

            <Reveal direction="up" delay={0.14}>
              <h1 className="text-heading mt-6 max-w-3xl font-semibold">{servicesHub.h1}</h1>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{servicesHub.lede}</p>
            </Reveal>

            <Reveal direction="up" delay={0.26}>
              <div className="mt-10">
                <Button href="#contact" size="lg">
                  Book a flight check
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Reveal>

            <Stagger className="mt-20 grid gap-5 md:grid-cols-2">
              {servicePages.map((service) => {
                const Icon = service.icon;
                return (
                  <StaggerItem key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className="group border-gradient flex h-full flex-col rounded-2xl bg-navy/40 p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 md:p-8"
                    >
                      <span className="inline-flex size-13 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.02]">
                        <Icon
                          className="size-6 text-electric-300 transition-all duration-500 group-hover:scale-110 group-hover:text-cream"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <h2 className="mt-7 text-2xl font-semibold tracking-tight text-cream">
                        {service.title}
                      </h2>
                      <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                        {service.homepageDescription}
                      </p>
                      <ul className="mt-7 flex flex-wrap gap-2">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-[0.6875rem] tracking-wide text-muted"
                          >
                            {capability}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-8 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase transition-colors group-hover:text-cream">
                        Explore {service.shortTitle.toLowerCase()}
                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <CTA />
      </main>
    </>
  );
}
