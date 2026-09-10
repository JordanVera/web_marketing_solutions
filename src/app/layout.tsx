import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, Space_Mono } from 'next/font/google';
import { company, homePage } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';
import { ScrollToTop } from '@/components/ScrollToTop';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const description = homePage.metaDescription;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homePage.metaTitle,
    template: `%s | ${company.name}`,
  },
  description,
  keywords: [...homePage.keywords],
  authors: [{ name: company.name }],
  creator: company.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: company.name,
    title: homePage.metaTitle,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: homePage.metaTitle,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Marketing Agency',
};

export const viewport: Viewport = {
  themeColor: '#050b16',
  colorScheme: 'dark',
};

/** Structured data so search engines read us as a Houston-based local business. */
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: company.name,
  description,
  url: SITE_URL,
  email: company.email,
  telephone: company.phone,
  foundingDate: company.founded,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.coordinates.lat,
    longitude: company.coordinates.lng,
  },
  areaServed: [
    { '@type': 'City', name: 'Houston' },
    { '@type': 'State', name: 'Texas' },
  ],
  knowsAbout: [
    'Houston digital agency',
    'Website Development',
    'Web Application Development',
    'Native App Development',
    'SEO Campaigns',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-electric focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Structured data is a trusted, server-built constant.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Analytics />
      </body>
    </html>
  );
}
