import type { AtmosphereVariant } from '@/components/ui/Atmosphere';
import type { ServiceSlug } from '@/lib/services';

export const AMBER_SHEEN =
  'shadow-[0_8px_36px_-8px_rgba(255,92,0,0.5),0_8px_30px_-8px_rgba(251,146,60,0.55)]';

export type ServiceTheme = {
  /** Nebula art for service page heroes. */
  src: string;
  /** Rocket launch art for home and card surfaces. */
  cardSrc: string;
  imageClass: string;
  cardImageClass?: string;
  atmosphere: AtmosphereVariant;
  callsign: string;
  heroOverlay: string;
  cardOverlay: string;
};

export const SERVICE_THEME: Record<ServiceSlug, ServiceTheme> = {
  'website-development': {
    src: '/space/amber-nebula.webp',
    cardSrc: '/space/amber-rocket.webp',
    imageClass: 'object-center',
    atmosphere: 'amber',
    callsign: 'WMS-SITE',
    heroOverlay: 'bg-linear-to-br from-void/88 via-void/72 to-void/48',
    cardOverlay:
      'bg-linear-to-r from-void/88 via-void/70 to-void/40 md:via-void/55 md:to-void/25',
  },
  'web-app-development': {
    src: '/space/carina-nebula.webp',
    cardSrc: '/space/carina-rocket.webp',
    imageClass: 'object-center',
    cardImageClass: 'object-[center_40%]',
    atmosphere: 'cyan',
    callsign: 'WMS-APP',
    heroOverlay: 'bg-linear-to-br from-void/86 via-void/68 to-void/46',
    cardOverlay: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
  'native-app-development': {
    src: '/space/cyan-nebula.webp',
    cardSrc: '/space/cyan-rocket.webp',
    imageClass: 'object-center',
    atmosphere: 'aurora',
    callsign: 'WMS-MOB',
    heroOverlay: 'bg-linear-to-br from-void/86 via-void/68 to-void/46',
    cardOverlay: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
  'seo-campaigns': {
    src: '/space/pillars-of-creation.webp',
    cardSrc: '/space/pillars-rocket.webp',
    imageClass: 'object-[40%_center]',
    cardImageClass: 'object-center',
    atmosphere: 'aurora',
    callsign: 'WMS-SEO',
    heroOverlay: 'bg-linear-to-br from-void/84 via-void/64 to-void/46',
    cardOverlay: 'bg-linear-to-t from-void via-void/70 to-navy/45',
  },
};

export function missionEyebrow(index: number, label: string) {
  return `${String(index).padStart(2, '0')} — ${label}`;
}
