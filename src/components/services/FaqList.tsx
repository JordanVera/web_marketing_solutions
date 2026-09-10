import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/content';

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-navy/40">
      {faqs.map((faq) => (
        <details key={faq.question} className="group px-6 py-1 md:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold tracking-tight text-cream marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted-dim transition-transform duration-300 group-open:rotate-180 group-open:text-electric-300"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-6 text-[0.9375rem] leading-relaxed text-muted">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
