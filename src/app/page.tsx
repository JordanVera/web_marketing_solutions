import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Houston } from '@/components/Houston';
import { Projects } from '@/components/Projects';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Services />
        <Houston />
        <Projects />
        <Process />
        {/* <Testimonials /> */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
