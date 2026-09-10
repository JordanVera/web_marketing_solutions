import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  primary: cn(
    "bg-electric text-white shadow-[0_8px_30px_-8px_rgba(0,102,255,0.85)]",
    "hover:bg-electric-400 hover:shadow-[0_12px_44px_-8px_rgba(0,102,255,0.95)] hover:-translate-y-0.5",
    "active:translate-y-0",
  ),
  secondary: cn(
    "border border-white/15 bg-white/5 text-cream backdrop-blur-sm",
    "hover:border-electric-400/60 hover:bg-white/10 hover:-translate-y-0.5",
    "active:translate-y-0",
  ),
  ghost: "text-muted hover:text-cream",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type AnchorProps = CommonProps & {
  href: string;
  /** Opens in a new tab with the appropriate rel attributes. */
  external?: boolean;
  "aria-label"?: string;
};

function Shine() {
  // Diagonal highlight that sweeps across the button on hover.
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full motion-reduce:hidden"
    />
  );
}

export function Button(props: ButtonProps | AnchorProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const showShine = variant !== "ghost";

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    const isAnchorLink = href.startsWith("#") || href.startsWith("/#");

    const content = (
      <>
        {showShine && <Shine />}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </>
    );

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={props["aria-label"]}
        >
          {content}
        </a>
      );
    }

    // Plain <a> for same-page anchors so native smooth scrolling applies.
    if (isAnchorLink) {
      return (
        <a href={href} className={classes} aria-label={props["aria-label"]}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {content}
      </Link>
    );
  }

  const { children: _children, variant: _v, size: _s, className: _c, ...rest } = props as ButtonProps;

  return (
    <button className={classes} {...rest}>
      {showShine && <Shine />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
