import type { FaqItem } from '@/lib/content';

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <details
          key={faq.question}
          className="group border-gradient glass-panel overflow-hidden rounded-2xl"
        >
          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-left marker:content-none md:px-6 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="h-8 w-0.5 shrink-0 rounded-full bg-white/10 transition-colors duration-300 group-open:bg-aurora"
            />
            <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-dim uppercase tabular-nums">
              Q-{String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-base font-semibold tracking-tight text-cream">
              {faq.question}
            </span>
            <SignalBars />
          </summary>
          <p className="px-5 pb-6 pl-[4.25rem] text-[0.9375rem] leading-relaxed text-muted md:px-6 md:pl-[4.75rem]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

function SignalBars() {
  return (
    <span
      aria-hidden="true"
      className="flex h-4 items-end gap-0.5 text-muted-dim transition-colors duration-300 group-open:text-aurora-300"
    >
      <span className="h-1.5 w-0.5 rounded-sm bg-current" />
      <span className="h-2.5 w-0.5 rounded-sm bg-current" />
      <span className="h-4 w-0.5 rounded-sm bg-current" />
    </span>
  );
}
