import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { BookNowButton } from '@/components/booking/BookNowButton';
import { contact } from '@/data/hotel';

export function CtaBand() {
  const message = encodeURIComponent(
    'Hola, me gustaría consultar disponibilidad en el Hotel Gran Real Punta Cana.',
  );
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${message}`;

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/gallery-pool.jpg"
        alt="Piscina del hotel en un entorno tropical (imagen provisional)"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-ocean-900/80"
        aria-hidden="true"
      />
      <div className="container relative z-10 py-20 text-center sm:py-24">
        <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-cream sm:text-4xl">
          ¿Preparado para tu próxima estancia?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-cream/80">
          Confirma con el hotel la disponibilidad y las tarifas para tus fechas.
          Te ayudamos a dar el primer paso.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookNowButton variant="gold" size="lg" label="Reservar ahora" />
          <Button
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <Icon name="whatsapp" className="text-lg" />
            WhatsApp
          </Button>
          <Button
            href={`tel:${contact.phoneTel}`}
            variant="secondary"
            size="lg"
          >
            <Icon name="phone" className="text-lg" />
            {contact.phoneDisplay}
          </Button>
        </div>
      </div>
    </section>
  );
}
