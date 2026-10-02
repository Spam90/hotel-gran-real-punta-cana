import type { Service } from '@/types';

/**
 * Servicios recopilados. No se detallan horarios, precios, tratamientos ni
 * condiciones específicas porque no están confirmados.
 */
export const services: Service[] = [
  {
    id: 'pool',
    title: 'Piscina exterior',
    description:
      'Zona de piscina al aire libre para descansar durante la estancia.',
  },
  {
    id: 'spa',
    title: 'Spa',
    description: 'Espacio de bienestar con servicios de spa en la propiedad.',
  },
  {
    id: 'restaurant',
    title: 'Restaurante',
    description: 'Restaurante del hotel para las comidas principales del día.',
  },
  {
    id: 'bar',
    title: 'Bar',
    description: 'Bar para disfrutar de bebidas y ambiente relajado.',
  },
  {
    id: 'events',
    title: 'Salón de eventos',
    description: 'Salón disponible para reuniones y celebraciones.',
  },
  {
    id: 'roomService',
    title: 'Servicio a la habitación',
    description: 'Atención en la habitación para mayor comodidad.',
  },
  {
    id: 'reception',
    title: 'Recepción 24 horas',
    description: 'Recepción disponible a cualquier hora del día.',
  },
  {
    id: 'parking',
    title: 'Estacionamiento gratuito',
    description: 'Plaza de aparcamiento sin coste para los huéspedes.',
  },
  {
    id: 'accessible',
    title: 'Acceso para personas con discapacidad',
    description: 'Instalaciones con consideraciones de accesibilidad.',
  },
  {
    id: 'wifi',
    title: 'Wi-Fi en toda la propiedad',
    description: 'Conexión inalámbrica gratuita en las áreas del hotel.',
  },
];
