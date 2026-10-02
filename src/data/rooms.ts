import type { Room } from '@/types';

/**
 * Categorías de habitación consultadas en fuentes públicas.
 * Los datos de capacidad, disponibilidad y tarifas no se presentan como oficiales
 * ni vigentes sin confirmación del hotel.
 */
export const rooms: Room[] = [
  {
    id: 'standard',
    name: 'Habitación Estándar',
    tagline: 'Categoría base por confirmar',
    description:
      'Habitación estándar según información pública consultada; la configuración exacta debe confirmarse directamente con el hotel.',
    units: null,
    features: [
      '1 cama grande o cama doble',
      'Baño privado',
      'Wi‑Fi gratuito',
      'Aire acondicionado',
    ],
    price: null,
    image: '/images/room-sencilla.jpg',
    imageAlt: 'Habitación de hotel (imagen provisional)',
  },
  {
    id: 'deluxe',
    name: 'Habitación Deluxe',
    tagline: 'Categoría por confirmar',
    description:
      'Habitación deluxe según referencias públicas. La distribución exacta y la disponibilidad deben confirmarse con el establecimiento.',
    units: null,
    features: [
      '1 cama doble',
      'Baño privado',
      'Wi‑Fi gratuito',
      'Aire acondicionado',
    ],
    price: null,
    image: '/images/room-familiar.jpg',
    imageAlt: 'Habitación de hotel (imagen provisional)',
  },
  {
    id: 'double',
    name: 'Habitación Doble',
    tagline: 'Categoría por confirmar',
    description:
      'Habitación doble según referencias públicas. La disponibilidad real debe confirmarse con el hotel.',
    units: null,
    features: [
      '2 camas individuales',
      'Baño privado',
      'Wi‑Fi gratuito',
      'Aire acondicionado',
    ],
    price: null,
    image: '/images/room-vip.jpg',
    imageAlt: 'Habitación de hotel (imagen provisional)',
  },
  {
    id: 'suite',
    name: 'Suite',
    tagline: 'Categoría por confirmar',
    description:
      'Suite según referencias públicas. Los detalles exactos, incluida la bañera de hidromasaje, deben confirmarse con el hotel.',
    units: null,
    features: [
      '1 cama doble extragrande',
      'Baño privado',
      'Bañera de hidromasaje (por confirmar)',
      'Wi‑Fi gratuito',
    ],
    price: null,
    image: '/images/gallery-room.jpg',
    imageAlt: 'Suite de hotel (imagen provisional)',
  },
];
