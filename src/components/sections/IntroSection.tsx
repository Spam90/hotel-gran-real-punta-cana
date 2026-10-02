import Image from 'next/image';
import { Icon } from '@/components/icons';
import { hotel } from '@/data/hotel';

const facts = [
  { icon: 'sparkle', label: 'Categoría', value: hotel.category },
  { icon: 'location', label: 'Ubicación', value: `${hotel.city}, ${hotel.region}` },
  { icon: 'clock', label: 'Estancia', value: 'Check-in 15:00 · Check-out 11:00' },
] as const;

export function IntroSection() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/images/gallery-exterior.jpg"
              alt="Zona exterior del hotel con piscina y vegetación (imagen provisional)"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-56 rounded-xl border border-ocean-100 bg-white p-5 shadow-card sm:block">
            <p className="font-display text-3xl text-ocean-800">4★</p>
            <p className="mt-1 text-sm text-ocean-600/90">
              Categoría recopilada del establecimiento.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            El hotel
          </p>
          <h2 className="font-display text-3xl leading-tight text-ocean-800 sm:text-4xl">
            Un punto de partida para descubrir Bávaro
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ocean-600/90">
            {hotel.name} se encuentra en {hotel.city}, en una zona bien conectada
            con los principales atractivos de Punta Cana. Un alojamiento pensado
            para descansar y, al mismo tiempo, estar cerca de todo lo que ofrece el
            destino.
          </p>

          <dl className="mt-8 space-y-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
                  <Icon name={fact.icon} className="text-lg" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-ocean-500">
                    {fact.label}
                  </dt>
                  <dd className="text-sm font-medium text-ocean-800">
                    {fact.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
