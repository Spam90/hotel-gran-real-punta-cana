'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/icons';
import { contact } from '@/data/hotel';
import { formatPriceRange } from '@/lib/dates';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useBooking } from '@/components/booking/BookingProvider';
import { RoomPhotoCarousel } from '@/components/ui/RoomPhotoCarousel';
import type { Room } from '@/types';

function featureIcon(feature: string): IconName {
  const f = feature.toLowerCase();
  if (f.includes('cama')) return 'bed';
  if (f.includes('baño')) return 'bath';
  if (f.includes('vestier')) return 'closet';
  if (f.includes('wi-fi')) return 'wifi';
  if (f.includes('televisor')) return 'tv';
  if (f.includes('aire')) return 'ac';
  if (f.includes('nevera')) return 'fridge';
  if (f.includes('plancha')) return 'iron';
  if (f.includes('caja')) return 'safe';
  return 'sparkle';
}

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  const previewFeatures = room.features.slice(0, 4);

  const photos = [
    {
      src: room.image,
      alt: room.imageAlt,
      caption: `${room.name} (imagen provisional)`,
    },
    {
      src: '/images/gallery-interior.jpg',
      alt: 'Área interior del hotel (imagen de referencia)',
      caption: 'Zona común del hotel (imagen de referencia)',
    },
    {
      src: '/images/gallery-room.jpg',
      alt: 'Detalle de habitación con luz natural (imagen de referencia)',
      caption: 'Detalle de habitación (imagen de referencia)',
    },
  ];

  const consultMessage = `Hola, me gustaría consultar la disponibilidad y tarifa de la ${room.name} en el Hotel Gran Real Punta Cana.`;
  const consultUrl = buildWhatsAppUrl(contact.whatsappNumber, consultMessage);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.image}
          alt={room.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ocean-900/70 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
          {room.units} habitaciones en el hotel
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-ocean-800">{room.name}</h3>
        <p className="mt-1 text-sm font-medium text-gold-600">{room.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ocean-600/90">
          {room.description}
        </p>

        <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-ocean-700">
          {previewFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Icon
                name={featureIcon(feature)}
                className="shrink-0 text-base text-gold-500"
              />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-3 border-t border-ocean-50 pt-5">
          <div>
            {room.price?.isReference ? (
              <>
                <p className="text-xs uppercase tracking-widest text-ocean-500">
                  Tarifa de referencia
                </p>
                <p className="font-display text-2xl text-ocean-800">
                  {formatPriceRange(room.price)}
                  <span className="ml-1 text-sm font-normal text-ocean-500">
                    / noche
                  </span>
                </p>
              </>
            ) : (
              <p className="font-display text-xl text-ocean-800">
                Consultar tarifa
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1 text-sm font-medium text-ocean-700 underline-offset-4 hover:text-gold-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            Ver detalles
            <Icon name="arrowRight" className="text-base" />
          </button>
        </div>

        <Button
          variant="primary"
          size="md"
          className="mt-5 w-full"
          onClick={() => openBooking({ roomId: room.id })}
        >
          Reservar
        </Button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={room.name}>
        <div className="mb-5">
          <RoomPhotoCarousel images={photos} />
        </div>
        <p className="text-sm leading-relaxed text-ocean-700">
          {room.description}
        </p>

        <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-ocean-800">
          Características
        </h4>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {room.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 rounded-lg bg-sand-50 px-3 py-2 text-sm text-ocean-700"
            >
              <Icon
                name={featureIcon(feature)}
                className="shrink-0 text-base text-gold-500"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl bg-ocean-50 p-4 text-sm text-ocean-700">
          {room.price?.isReference ? (
            <p>
              <strong>Tarifa de referencia:</strong>{' '}
              {formatPriceRange(room.price)} / noche.{' '}
              <span className="text-ocean-600/80">
                Precio orientativo pendiente de confirmación por el hotel; no es
                una oferta garantizada.
              </span>
            </p>
          ) : (
            <p>
              <strong>Tarifa:</strong> consultar con el hotel. No se dispone de un
              precio confirmado para esta categoría.
            </p>
          )}
          <p className="mt-2 text-xs text-ocean-600/80">
            La cantidad indicada ({room.units} habitaciones) es un dato recopilado y
            no representa la disponibilidad actual.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            href={consultUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="flex-1"
          >
            <Icon name="whatsapp" className="text-lg" />
            Consultar por WhatsApp
          </Button>
          <Button
            href={`tel:${contact.phoneTel}`}
            variant="ghost"
            size="lg"
            className="flex-1"
          >
            <Icon name="phone" className="text-lg" />
            Llamar al hotel
          </Button>
        </div>
      </Modal>
    </article>
  );
}
