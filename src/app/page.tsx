import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { Services } from '@/components/Services';
import { Houston } from '@/components/Houston';
import { Projects } from '@/components/Projects';
import { Process } from '@/components/Process';
import { HomeFaq } from '@/components/HomeFaq';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { homePage } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

export const metadata: Metadata = {
  title: { absolute: homePage.metaTitle },
  description: homePage.metaDescription,
  keywords: [...homePage.keywords],
  alternates: { canonical: '/' },
  openGraph: {
    title: homePage.metaTitle,
    description: homePage.metaDescription,
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homePage.metaTitle,
    description: homePage.metaDescription,
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <Houston />
        {/* <Projects /> */}
        <Process />
        <HomeFaq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
