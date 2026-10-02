/** Utilidades de calendario (sin dependencias), pensadas para fechas ISO yyyy-mm-dd. */

export const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Construye una fecha ISO a partir de año, mes (0-11) y día. */
export function isoOf(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

/** Número de días de un mes. */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Año y mes (0-11) de una fecha ISO. */
export function yearMonthOf(iso: string): { year: number; month: number } {
  const [y, m] = iso.split('-').map(Number);
  return { year: y, month: m - 1 };
}

/**
 * Matriz de semanas (Monday-first) para un mes. Cada celda es una fecha ISO o
 * null. Devuelve filas de 7 columnas.
 */
export function monthGrid(year: number, month: number): (string | null)[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // 0 = lunes
  const total = daysInMonth(year, month);
  const cells: (string | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(isoOf(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** Formatea una fecha ISO como dd/mm/aaaa. */
export function displayDate(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

/** Nombre largo de una fecha ISO, p. ej. "viernes, 3 de octubre". */
export function longDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00`);
  const weekday = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][
    date.getDay()
  ];
  return `${weekday}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}

/** Número de noches entre dos fechas ISO (excluye el check-out). */
export function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  return Math.max(
    0,
    Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000),
  );
}
