import type { GalleryImage } from '@/types';

/**
 * Galería provisional. Todas las imágenes son de stock (ver
 * /public/images/CREDITS.txt) y NO corresponden a instalaciones verificadas del
 * Hotel Gran Real Punta Cana. Deben sustituirse por fotografías oficiales.
 *
 * Las etiquetas son descriptivas del TIPO de espacio (piscina, recepción…); no
 * se afirma que una imagen concreta sea una instalación real del hotel.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'pool',
    src: '/images/gallery-pool.jpg',
    alt: 'Piscina exterior con tumbonas y vegetación tropical (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'reception',
    src: '/images/gallery-reception.jpg',
    alt: 'Recepción de hotel con mobiliario moderno (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'room',
    src: '/images/gallery-room.jpg',
    alt: 'Habitación de hotel ordenada con luz natural (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'interior',
    src: '/images/gallery-interior.jpg',
    alt: 'Área interior de descanso del hotel (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'spa',
    src: '/images/gallery-spa.jpg',
    alt: 'Sala de spa con iluminación cálida (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'restaurant',
    src: '/images/gallery-restaurant.jpg',
    alt: 'Comedor del restaurante preparado para el servicio (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'bar',
    src: '/images/gallery-bar.jpg',
    alt: 'Bar con ambiente relajado (imagen provisional)',
    placeholder: true,
  },
  {
    id: 'exterior',
    src: '/images/gallery-exterior.jpg',
    alt: 'Exterior del hotel con zona de piscina (imagen provisional)',
    placeholder: true,
  },
];
