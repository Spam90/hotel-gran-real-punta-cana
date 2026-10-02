import { SectionHeading } from '@/components/ui/SectionHeading';
import { RoomsExplorer } from '@/components/sections/RoomsExplorer';
import { Icon } from '@/components/icons';

export function RoomsSection() {
  return (
    <section id="habitaciones" className="bg-sand-50 py-20 sm:py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Alojamiento"
          title="Nuestras habitaciones"
          description="Categorías por confirmar según información pública consultada. Usa los filtros para acotar por categoría, camas, baños o precio de referencia."
        />

        <div className="mt-10">
          <RoomsExplorer />
        </div>

        <p className="mt-10 flex items-start gap-2 text-sm text-ocean-600/90">
          <Icon name="check" className="mt-0.5 text-base text-gold-500" />
          La disponibilidad, las tarifas y la cantidad de habitaciones deben ser
          confirmadas por el hotel. Las fotografías son provisionales.
        </p>
      </div>
    </section>
  );
}
