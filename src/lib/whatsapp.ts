import type { StayQuery } from '@/types';

/**
 * Construye el enlace de WhatsApp (wa.me) a partir de un número internacional
 * normalizado y un mensaje.
 *
 * Nota: se asume que el número podría no tener WhatsApp habilitado. Toda la
 * integración está centralizada aquí para poder sustituir el contacto cuando el
 * hotel confirme el canal correcto.
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Formatea una fecha ISO (yyyy-mm-dd) al estilo dd/mm/aaaa. */
function displayDate(value: string): string {
  if (!value) return '';
  const [y, m, d] = value.split('-');
  if (!y || !m || !d) return value;
  return `${d}/${m}/${y}`;
}

/** Mensaje de consulta de disponibilidad para WhatsApp. */
export function buildStayMessage(query: StayQuery, roomLabel?: string): string {
  const lines = [
    'Hola, me gustaría consultar disponibilidad en el Hotel Gran Real Punta Cana.',
    `Entrada: ${displayDate(query.checkIn)}`,
    `Salida: ${displayDate(query.checkOut)}`,
    `Huéspedes: ${query.guests}`,
  ];
  if (roomLabel) {
    lines.push(`Tipo de habitación: ${roomLabel}`);
  }
  lines.push('¿Podrían confirmarme disponibilidad y tarifas? Gracias.');
  return lines.join('\n');
}
