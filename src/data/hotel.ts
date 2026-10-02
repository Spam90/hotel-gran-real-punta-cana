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
  category: 'Por confirmar',
  city: 'Bávaro',
  region: 'Punta Cana',
  country: 'República Dominicana',
  intro:
    'Hotel en la zona de Bávaro, Punta Cana. La información detallada y la disponibilidad real deben confirmarse con el establecimiento.',
} as const;

export const contact: ContactDetails = {
  phoneDisplay: 'Por confirmar',
  phoneTel: 'Por confirmar',
  whatsappNumber: 'Por confirmar',
  addressLine: 'Dirección por confirmar',
  city: 'Bávaro',
  region: 'Punta Cana',
  country: 'República Dominicana',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Hotel+Gran+Real+Punta+Cana+B%C3%A1varo',
};

export const practicalInfo: PracticalInfoItem[] = [
  { id: 'checkin', label: 'Check-in', value: 'Por confirmar' },
  { id: 'checkout', label: 'Check-out', value: 'Por confirmar' },
  { id: 'wifi', label: 'Wi-Fi', value: 'Gratuito (por confirmar con el hotel)' },
  { id: 'parking', label: 'Estacionamiento', value: 'Por confirmar' },
  {
    id: 'phone',
    label: 'Teléfono',
    value: 'Por confirmar',
  },
  {
    id: 'location',
    label: 'Ubicación',
    value: 'Bávaro, Punta Cana (dirección exacta por confirmar)',
  },
];

/**
 * Distancias y tiempos aproximados recopilados.
 * Son referencias pendientes de verificación; no son mediciones exactas.
 */
export const attractions: Attraction[] = [];
