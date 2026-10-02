'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/icons';
import { gallery } from '@/data/gallery';

/** Posiciones destacadas en la cuadrícula editorial (solo en pantallas grandes). */
const spans = [
  'lg:col-span-2 lg:row-span-2',
  '',
  '',
  'lg:row-span-2',
  '',
  'lg:col-span-2',
  '',
  '',
];

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (dir: number) => {
      setIndex((current) => {
        if (current === null) return current;
        const next = (current + dir + gallery.length) % gallery.length;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, go]);

  return (
    <section id="galeria" className="bg-sand-50 py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Galería"
          title="Un vistazo al hotel"
          description="Imágenes de referencia de espacios como la piscina, la recepción o las habitaciones. Son fotografías provisionales y deben sustituirse por material oficial del hotel."
        />

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4">
          {gallery.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
                spans[i] ?? ''
              }`}
              aria-label={`Ampliar imagen: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ocean-900/0 transition-colors duration-300 group-hover:bg-ocean-900/20" />
              <span className="absolute right-3 top-3 rounded-full bg-ocean-900/60 p-2 text-cream opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Icon name="sparkle" className="text-base" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && index !== null ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ocean-900/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes de la galería"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar visor"
              className="rounded-full bg-cream/10 p-2 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Icon name="close" className="text-2xl" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Imagen anterior"
              className="absolute left-0 z-10 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Icon name="chevronDown" className="rotate-90 text-2xl" />
            </button>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl">
              <Image
                src={gallery[index].src}
                alt={gallery[index].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Imagen siguiente"
              className="absolute right-0 z-10 rounded-full bg-cream/10 p-3 text-cream transition hover:bg-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <Icon name="chevronDown" className="-rotate-90 text-2xl" />
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-cream/80">
            {gallery[index].alt}
          </p>
        </div>
      ) : null}
    </section>
  );
}
