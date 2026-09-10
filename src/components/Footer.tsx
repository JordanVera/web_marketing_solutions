import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from './Logo';
import { SocialIcon } from './SocialIcon';
import { NewsletterForm } from './NewsletterForm';
import { Reveal } from './ui/Reveal';
import { company, footerNav, socials } from '@/lib/content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-void">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.10),transparent_65%)] blur-3xl"
      />

      <div className="container-shell relative py-16 md:py-20">
        <Reveal direction="up" amount={0.1}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-flex" aria-label={`${company.name} — home`}>
                <Logo />
              </Link>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                A Houston studio for web apps, native apps, websites, and SEO campaigns — for
                brands that would rather build something worth launching than ship another template.
              </p>

              <ul className="mt-7 flex gap-2.5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${company.name} on ${social.label}`}
                      className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-400/50 hover:text-cream"
                    >
                      <SocialIcon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link columns */}
            <nav className="lg:col-span-2" aria-label="Services">
              <FooterHeading>Services</FooterHeading>
              <ul className="mt-5 flex flex-col gap-3.5">
                {footerNav.services.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="lg:col-span-2" aria-label="Company">
              <FooterHeading>Company</FooterHeading>
              <ul className="mt-5 flex flex-col gap-3.5">
                {footerNav.company.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact + signup */}
            <div className="lg:col-span-4">
              <FooterHeading>Mission control</FooterHeading>
              <ul className="mt-5 flex flex-col gap-3.5 text-sm">
                <li>
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-cream"
                  >
                    <Mail
                      className="size-4 shrink-0 text-electric-300"
                      aria-hidden="true"
                    />
                    {company.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-cream"
                  >
                    <Phone
                      className="size-4 shrink-0 text-electric-300"
                      aria-hidden="true"
                    />
                    {company.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-muted">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-electric-300"
                    aria-hidden="true"
                  />
                  <address className="not-italic">
                    {company.address.street}
                    <br />
                    {company.address.locality}, {company.address.region}{' '}
                    {company.address.postalCode}
                  </address>
                </li>
              </ul>

              <div className="mt-8">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/[0.07] pt-8 md:flex-row">
          <p className="text-xs text-muted-dim">
            © {year} {company.name}. All rights reserved.
          </p>

          <p className="font-mono text-[0.625rem] tracking-[0.24em] text-muted-dim uppercase">
            Built in {company.city} · {company.coordinates.lat.toFixed(2)}° N,{' '}
            {Math.abs(company.coordinates.lng).toFixed(2)}° W
          </p>

          <ul className="flex gap-6 text-xs">
            <li>
              <FooterLink href="/privacy">Privacy</FooterLink>
            </li>
            <li>
              <FooterLink href="/terms">Terms</FooterLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.625rem] tracking-[0.24em] text-cream uppercase">
      {children}
    </h2>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className = "text-sm text-muted transition-colors duration-300 hover:text-cream";
  const useNativeAnchor =
    href.startsWith("#") || href.includes("#") || href.startsWith("http") || href.startsWith("mailto");

  if (useNativeAnchor) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
