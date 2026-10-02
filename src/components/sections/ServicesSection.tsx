import { SectionHeading } from '@/components/ui/SectionHeading';
import { Icon } from '@/components/icons';
import { services } from '@/data/services';

const iconByService = {
  pool: 'pool',
  reception: 'reception',
  parking: 'parking',
  accessible: 'accessible',
  wifi: 'wifi',
  ac: 'ac',
  cleaning: 'check',
  nonsmoking: 'check',
  breakfast: 'restaurant',
} as const;

export function ServicesSection() {
  return (
    <section id="servicios" className="bg-cream py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Servicios"
          title="Servicios y amenidades"
          description="Servicios revisados y presentados como información por confirmar. La verificación oficial debe hacerse con el establecimiento."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <li
              key={service.id}
              className="group rounded-[24px] border border-ocean-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ocean-50 text-ocean-600 transition-colors group-hover:bg-gold-400/20 group-hover:text-gold-600">
                <Icon
                  name={iconByService[service.id]}
                  className="text-2xl"
                />
              </span>
              <h3 className="mt-4 font-display text-lg text-ocean-800">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ocean-600/90">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
