import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { company } from "@/lib/content";
import { SITE_URL } from "@/lib/utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const description =
  "Houston web app, native app, website, and SEO campaign studio. We build conversion-focused products and search programs from Space City.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name} | Houston Web App, Website & SEO Agency`,
    template: `%s | ${company.name}`,
  },
  description,
  keywords: [
    "Houston web app development",
    "Houston native app development",
    "Houston website development",
    "Houston SEO campaigns",
    "Houston SEO agency",
    "web marketing solutions",
    "Next.js development agency",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: company.name,
    title: `${company.name} | Houston Web App, Website & SEO Agency`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Houston Web App, Website & SEO`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Marketing Agency",
};

export const viewport: Viewport = {
  themeColor: "#050b16",
  colorScheme: "dark",
};

/** Structured data so search engines read us as a Houston-based local business. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.name,
  description,
  url: SITE_URL,
  email: company.email,
  telephone: company.phone,
  foundingDate: company.founded,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.locality,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: company.coordinates.lat,
    longitude: company.coordinates.lng,
  },
  areaServed: [
    { "@type": "City", name: "Houston" },
    { "@type": "State", name: "Texas" },
  ],
  knowsAbout: [
    "Web Application Development",
    "Native App Development",
    "Website Development",
    "SEO Campaigns",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-electric focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Structured data is a trusted, server-built constant.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
