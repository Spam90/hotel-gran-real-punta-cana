import type { Room } from '@/types';

/**
 * Categorías de habitación según la información recopilada.
 * La cantidad de habitaciones es un dato histórico recopilado, NO la
 * disponibilidad actual. Las tarifas marcadas como referencia están pendientes
 * de confirmación; las categorías sin tarifa se muestran como "Consultar tarifa".
 *
 * Las fotografías son PROVISIONALES (stock, ver /public/images/CREDITS.txt) y
 * deben sustituirse por material oficial del hotel.
 */
export const rooms: Room[] = [
  {
    id: 'sencilla',
    name: 'Habitación Sencilla',
    tagline: 'La opción más práctica para tu estancia',
    description:
      'Una habitación de uso sencillo, pensada para viajeros que buscan comodidad y todo lo esencial bien resuelto durante su estancia en Bávaro.',
    units: 55,
    features: [
      '1 cama sencilla',
      '1 baño privado',
      'Vestier',
      'Wi-Fi gratuito',
      'Televisor de 30 pulgadas',
      'Aire acondicionado',
      'Nevera',
      'Plancha',
      'Caja fuerte',
    ],
    price: {
      from: 57,
      to: 68,
      currency: 'USD',
      isReference: true,
    },
    image: '/images/room-sencilla.jpg',
    imageAlt:
      'Habitación con una cama, mobiliario de madera clara y luz natural (imagen provisional)',
  },
  {
    id: 'familiar',
    name: 'Habitación Familiar',
    tagline: 'Más espacio para viajar en familia',
    description:
      'Categoría amplia con dos camas grandes y dos baños privados, una distribución pensada para compartir la estancia con mayor comodidad.',
    units: 4,
    features: [
      '2 camas grandes',
      '2 baños privados',
      'Vestier',
      'Wi-Fi gratuito',
      'Televisor de 30 pulgadas',
      'Aire acondicionado',
      'Nevera',
      'Plancha',
      'Caja fuerte',
    ],
    price: null,
    image: '/images/room-familiar.jpg',
    imageAlt:
      'Habitación con dos camas grandes y ambiente cálido (imagen provisional)',
  },
  {
    id: 'vip',
    name: 'Habitación VIP',
    tagline: 'Una estancia con un plus de amplitud',
    description:
      'Categoría con dos camas grandes y un baño privado, para quienes buscan un alojamiento más espacioso dentro del hotel.',
    units: 4,
    features: [
      '2 camas grandes',
      '1 baño privado',
      'Vestier',
      'Wi-Fi gratuito',
      'Televisor de 30 pulgadas',
      'Aire acondicionado',
      'Nevera',
      'Plancha',
      'Caja fuerte',
    ],
    price: null,
    image: '/images/room-vip.jpg',
    imageAlt:
      'Habitación elegante con dos camas grandes y tonos neutros (imagen provisional)',
  },
];
