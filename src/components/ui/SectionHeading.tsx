import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Small mono label above the title, e.g. "02 / SERVICES". */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal direction="up">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.22em] text-electric-300 uppercase">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-electric opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-1.5 rounded-full bg-electric-400" />
          </span>
          {eyebrow}
        </span>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className={cn("text-heading font-semibold", align === "center" && "max-w-3xl")}>
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.16}>
          <p className={cn("max-w-2xl text-base leading-relaxed text-muted md:text-lg")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
