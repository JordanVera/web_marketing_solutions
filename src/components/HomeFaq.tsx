import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { FaqList } from '@/components/services/FaqList';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Atmosphere } from '@/components/ui/Atmosphere';
import { Button } from '@/components/ui/Button';
import { StatusDot } from '@/components/ui/StatusDot';
import { homeFaqs, homePage } from '@/lib/content';

export function HomeFaq() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-24"
    >
      <Atmosphere variant="cyan" className="opacity-50" />
      <JsonLd data={structuredData} />
      <div className="container-shell relative">
        <SectionHeading
          eyebrow={homePage.faq.eyebrow}
          title={
            <>
              {homePage.faq.title}{' '}
              <span className="text-electric">{homePage.faq.titleAccent}</span>
            </>
          }
          description={homePage.faq.description}
        />

        <div className="mt-14 ">
          <Reveal direction="up" className="lg:col-span-7 xl:col-span-8">
            <FaqList faqs={homeFaqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
