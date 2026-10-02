import type { Service } from '@/types';

/**
 * Servicios recopilados. No se detallan horarios, precios ni condiciones específicas
 * porque no están confirmados por el hotel.
 */
export const services: Service[] = [
  {
    id: 'pool',
    title: 'Piscina exterior',
    description:
      'Piscina al aire libre; la disponibilidad y horario deben confirmarse con el hotel.',
  },
  {
    id: 'reception',
    title: 'Recepción 24 horas',
    description: 'Recepción disponible a cualquier hora del día; confirmar el servicio exacto con el establecimiento.',
  },
  {
    id: 'parking',
    title: 'Estacionamiento gratuito',
    description: 'Estacionamiento por confirmar según la política actual del hotel.',
  },
  {
    id: 'accessible',
    title: 'Habitaciones adaptadas / accesibilidad',
    description: 'Accesibilidad por confirmar con el establecimiento.',
  },
  {
    id: 'wifi',
    title: 'Wi‑Fi gratuito',
    description: 'Conexión inalámbrica gratuita; la cobertura y condiciones deben confirmarse con el hotel.',
  },
  {
    id: 'ac',
    title: 'Aire acondicionado',
    description: 'Aire acondicionado en habitaciones; confirmar en la categoría elegida.',
  },
  {
    id: 'cleaning',
    title: 'Limpieza diaria',
    description: 'Servicio de limpieza, por confirmar con el establecimiento.',
  },
  {
    id: 'nonsmoking',
    title: 'Habitaciones para no fumadores',
    description: 'Disponibilidad por confirmar con el hotel.',
  },
  {
    id: 'breakfast',
    title: 'Desayuno',
    description: 'Desayuno continental y americano; confirmar servicio actual y condiciones con el hotel.',
  },
];
