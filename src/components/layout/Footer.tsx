import { Icon } from '@/components/icons';
import { hotel, contact, practicalInfo } from '@/data/hotel';

const internalLinks = [
  { href: '#habitaciones', label: 'Habitaciones' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#ubicacion', label: 'Ubicación' },
  { href: '#contacto', label: 'Contacto' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ocean-800 text-cream/80">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-cream">Gran Real</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gold-400">
            Punta Cana
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            {hotel.category} en {hotel.city}. {hotel.region}.
          </p>
        </div>

        <nav aria-label="Navegación secundaria">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cream">
            Explora
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {internalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cream">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${contact.phoneTel}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-400"
              >
                <Icon name="phone" className="text-base" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="location" className="mt-0.5 text-base" />
              <span>
                {contact.addressLine}
                <br />
                {contact.city}, {contact.region}
                <br />
                {contact.country}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-cream">
            Información práctica
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {practicalInfo
              .filter((item) =>
                ['checkin', 'checkout', 'wifi', 'parking'].includes(item.id),
              )
              .map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span className="text-cream/60">{item.label}</span>
                  <span className="text-right">{item.value}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container flex flex-col gap-2 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {hotel.name}. Todos los derechos reservados.
          </p>
          <p>
            Demo conceptual. La disponibilidad, las tarifas y los datos de contacto
            deben ser confirmados por el hotel.
          </p>
        </div>
      </div>
    </footer>
  );
}
