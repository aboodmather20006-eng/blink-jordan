'use client';
import Image from 'next/image';
import { useState } from 'react';
export function Media({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 50vw, 25vw',
  position,
  fit = 'cover',
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  position?: string;
  fit?: 'cover' | 'contain';
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media ${className}`}>
      {failed ? (
        <span className="image-fallback">Image unavailable</span>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          onError={() => setFailed(true)}
          style={{ objectFit: fit, objectPosition: position }}
        />
      )}
    </div>
  );
}
