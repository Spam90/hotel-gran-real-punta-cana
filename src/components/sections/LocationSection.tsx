import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { contact, attractions } from '@/data/hotel';

const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  'Av. Barceló, Bávaro, Punta Cana, La Altagracia, República Dominicana',
)}&output=embed`;

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-cream py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Ubicación"
          title="Bien situados en Bávaro"
          description="El hotel se encuentra en Av. Barceló, en Bávaro, con acceso a algunos de los principales atractivos de Punta Cana."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-start gap-3 rounded-2xl border border-ocean-100 bg-white p-6 shadow-soft">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
                <Icon name="location" className="text-xl" />
              </span>
              <div>
                <p className="font-medium text-ocean-800">
                  {contact.addressLine}
                </p>
                <p className="text-sm text-ocean-600/90">
                  {contact.city}, {contact.region}
                  <br />
                  {contact.country}
                </p>
                <Button
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="md"
                  className="mt-4"
                >
                  <Icon name="compass" className="text-lg" />
                  Ver en Google Maps
                </Button>
              </div>
            </div>

            <h3 className="mt-8 font-display text-xl text-ocean-800">
              Atractivos cercanos
            </h3>
            <p className="mt-2 text-xs text-ocean-600/70">
              Distancias y tiempos aproximados recopilados, pendientes de
              verificación. No son mediciones exactas ni horarios garantizados.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {attractions.map((place) => (
                <li
                  key={place.name}
                  className="flex items-center justify-between gap-3 rounded-lg border border-ocean-50 bg-sand-50 px-4 py-2.5 text-sm"
                >
                  <span className="text-ocean-700">{place.name}</span>
                  <span className="shrink-0 font-medium text-gold-600">
                    {place.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ocean-100 shadow-soft">
            <iframe
              title="Mapa de la ubicación del Hotel Gran Real Punta Cana en Bávaro"
              src={embedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
