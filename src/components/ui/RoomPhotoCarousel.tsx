'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons';

export interface CarouselImage {
  src: string;
  alt: string;
  caption: string;
}

interface RoomPhotoCarouselProps {
  images: CarouselImage[];
}

/** Carrusel de fotos con navegación, contador y miniaturas. */
export function RoomPhotoCarousel({ images }: RoomPhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ocean-900/5">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/85 p-2 text-ocean-700 shadow-soft transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <Icon name="chevronDown" className="rotate-90 text-xl" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/85 p-2 text-ocean-700 shadow-soft transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <Icon name="chevronDown" className="-rotate-90 text-xl" />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-ocean-900/70 px-3 py-1 text-xs text-cream">
          {index + 1} / {images.length}
        </span>
      </div>

      <p className="mt-2 text-xs text-ocean-500">{current.caption}</p>

      <div className="mt-3 flex gap-2">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === index}
            className={`relative h-14 w-20 overflow-hidden rounded-lg border-2 transition ${
              i === index ? 'border-gold-400' : 'border-transparent opacity-70'
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}