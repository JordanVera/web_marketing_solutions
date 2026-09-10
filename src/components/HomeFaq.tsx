import { JsonLd } from '@/components/JsonLd';
import { FaqList } from '@/components/services/FaqList';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
    <section id="faq" className="relative scroll-mt-24 py-16 md:py-24">
      <JsonLd data={structuredData} />
      <div className="container-shell">
        <SectionHeading
          eyebrow={homePage.faq.eyebrow}
          title={
            <>
              {homePage.faq.title}{' '}
              <span className="text-gradient">{homePage.faq.titleAccent}</span>
            </>
          }
          description={homePage.faq.description}
        />
        <Reveal direction="up" className="mx-auto mt-14 max-w-4xl">
          <FaqList faqs={homeFaqs} />
        </Reveal>
      </div>
    </section>
  );
}
