import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

/** Shared chrome for the plain-text legal routes. */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-white/[0.07]">
        <div className="container-shell flex h-18 items-center justify-between">
          <Link href="/" className="group" aria-label="Back to home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>
      </header>

      <main id="main" className="container-shell py-20 md:py-28">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>

      <Footer />
    </>
  );
}
