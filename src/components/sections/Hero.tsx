import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { BookNowButton } from '@/components/booking/BookNowButton';
import { hotel, contact } from '@/data/hotel';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92svh] items-center overflow-hidden"
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
        className="absolute inset-0 bg-gradient-to-r from-ocean-900/82 via-ocean-900/62 to-ocean-800/30"
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-24 pt-28 sm:pb-28">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-ocean-900/25 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-cream/90 backdrop-blur-sm">
            <Icon name="location" className="text-sm text-gold-300" />
            {hotel.city} · {hotel.region}
          </p>

          <h1 className="max-w-2xl font-display text-4xl leading-[1.06] text-cream sm:text-5xl lg:text-6xl">
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

          <p className="mt-8 flex items-center gap-2 text-sm text-cream/75">
            <Icon name="compass" className="text-base text-gold-300" />
            {contact.addressLine}, {contact.city}
          </p>
        </div>
      </div>
    </section>
  );
}
