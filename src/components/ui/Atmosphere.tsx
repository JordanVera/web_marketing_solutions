import { cn } from '@/lib/utils';

export type AtmosphereVariant =
  | 'hero'
  | 'cyan'
  | 'aurora'
  | 'amber'
  | 'horizon';

type AtmosphereProps = {
  variant?: AtmosphereVariant;
  className?: string;
};

/**
 * CSS-only nebula layer. Keep canvases out of interior sections — one
 * Starfield in the hero is enough atmosphere for the whole page.
 */
export function Atmosphere({ variant = 'cyan', className }: AtmosphereProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {variant === 'hero' && (
        <>
          <div className="animate-drift glow-cyan absolute -top-24 -left-32 size-[38rem] rounded-full blur-3xl" />
          <div className="animate-drift glow-aurora absolute -top-10 right-[-10rem] size-[34rem] rounded-full blur-3xl [animation-delay:-11s]" />
          <div className="animate-drift glow-amber absolute bottom-8 left-1/3 size-[22rem] rounded-full blur-3xl [animation-delay:-18s]" />
        </>
      )}

      {variant === 'cyan' && (
        <div className="glow-cyan absolute top-0 left-1/2 h-[40rem] w-[64rem] -translate-x-1/2 rounded-full blur-3xl" />
      )}

      {variant === 'aurora' && (
        <div className="glow-aurora absolute top-1/2 left-0 size-[36rem] -translate-y-1/2 rounded-full blur-3xl" />
      )}

      {variant === 'amber' && (
        <div className="glow-amber absolute -bottom-24 left-1/2 size-[32rem] -translate-x-1/2 rounded-full blur-3xl" />
      )}

      {variant === 'horizon' && (
        <>
          <div className="glow-cyan absolute -bottom-40 left-1/2 size-[42rem] -translate-x-[70%] rounded-full blur-3xl" />
          <div className="glow-amber absolute -bottom-32 left-1/2 size-[36rem] -translate-x-[20%] rounded-full blur-3xl" />
          <div className="glow-aurora absolute bottom-0 right-[-8rem] size-[28rem] rounded-full blur-3xl" />
        </>
      )}
    </div>
  );
}
