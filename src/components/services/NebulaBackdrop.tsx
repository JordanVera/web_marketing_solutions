import Image from 'next/image';
import { cn } from '@/lib/utils';

type NebulaBackdropProps = {
  src: string;
  overlayClass: string;
  sizes: string;
  imageClass?: string;
  priority?: boolean;
};

/** Decorative nebula fill for framed heroes and glass cards. */
export function NebulaBackdrop({
  src,
  overlayClass,
  sizes,
  imageClass,
  priority = false,
}: NebulaBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'object-cover opacity-80 saturate-125',
          imageClass,
        )}
      />
      <div className={cn('absolute inset-0', overlayClass)} />
    </div>
  );
}
