import type {
  Attraction,
  ContactDetails,
  PracticalInfoItem,
} from '@/types';

/**
 * ⚠️ DATOS RECOPILADOS PENDIENTES DE VERIFICACIÓN
 * Toda la información de este archivo procede de fuentes públicas recopiladas y
 * debe ser confirmada por el Hotel Gran Real Punta Cana antes de un uso comercial.
 */
export const hotel = {
  name: 'Hotel Gran Real Punta Cana',
  shortName: 'Gran Real',
  category: 'Hotel de 4 estrellas',
  city: 'Bávaro',
  region: 'Punta Cana, La Altagracia',
  country: 'República Dominicana',
  intro:
    'Un punto de partida tranquilo en Bávaro para descubrir Punta Cana y su entorno, con espacios amplios, atención cercana y una ubicación bien conectada.',
} as const;

export const contact: ContactDetails = {
  phoneDisplay: '+1 (809) 795-0000',
  phoneTel: '+18097950000',
  whatsappNumber: '18097950000',
  addressLine: 'Av. Barceló, Bávaro',
  city: 'Punta Cana',
  region: 'La Altagracia',
  country: 'República Dominicana',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Barcel%C3%B3%2C+B%C3%A1varo%2C+Punta+Cana%2C+La+Altagracia%2C+Rep%C3%BAblica+Dominicana',
};

export const practicalInfo: PracticalInfoItem[] = [
  { id: 'checkin', label: 'Check-in', value: 'A partir de las 15:00' },
  { id: 'checkout', label: 'Check-out', value: 'Hasta las 11:00' },
  { id: 'wifi', label: 'Wi-Fi', value: 'Gratuito en toda la propiedad' },
  { id: 'parking', label: 'Estacionamiento', value: 'Gratuito' },
  {
    id: 'phone',
    label: 'Teléfono',
    value: contact.phoneDisplay,
  },
  {
    id: 'location',
    label: 'Ubicación',
    value: `${contact.addressLine}, ${contact.city}, ${contact.region}`,
  },
];

/**
 * Distancias y tiempos aproximados recopilados.
 * Son referencias pendientes de verificación; no son mediciones exactas.
 */
export const attractions: Attraction[] = [
  { name: 'Bavaro Adventure Park', distance: '≈ 3–4 km' },
  { name: 'ChocoMuseo Punta Cana', distance: '≈ 4–4,3 km' },
  { name: 'Imagine Punta Cana', distance: '≈ 4,4 km' },
  { name: 'Coco Bongo Punta Cana', distance: '≈ 4,7 km' },
  { name: 'Dolphin Discovery', distance: '≈ 5 km' },
  { name: 'Downtown Punta Cana', distance: '≈ 7 km' },
  { name: 'Manantiales', distance: '≈ 15 min en automóvil' },
  { name: 'Aeropuerto', distance: '≈ 30–40 min' },
];
