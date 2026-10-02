import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { BookNowButton } from '@/components/booking/BookNowButton';
import { hotel, contact } from '@/data/hotel';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92svh] items-center overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="Piscina exterior del hotel con vegetación tropical (imagen provisional)"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ocean-900/80 via-ocean-900/55 to-ocean-800/25"
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-28 pb-24">
        <div className="max-w-2xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-ocean-900/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-cream/90 backdrop-blur">
            <Icon name="location" className="text-sm text-gold-300" />
            {hotel.city} · {hotel.region}
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
            Tu próxima estancia en Punta Cana
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {hotel.intro}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookNowButton variant="gold" size="lg" label="Reservar ahora" />
            <Button href="#habitaciones" variant="secondary" size="lg">
              Explorar habitaciones
            </Button>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-cream/70">
            <Icon name="compass" className="text-base text-gold-300" />
            {contact.addressLine}, {contact.city}
          </p>
        </div>
      </div>
    </section>
  );
}
