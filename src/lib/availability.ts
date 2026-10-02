import { rooms } from '@/data/rooms';
import { addDaysISO } from '@/lib/dates';
import type { RoomCategoryId } from '@/types';

/**
 * ⚠️ MOTOR DE DISPONIBILIDAD SIMULADO (DEMO)
 * No consulta ningún sistema real del hotel. Genera disponibilidad y precios de
 * forma determinista (misma fecha → mismo resultado en servidor y cliente) para
 * que la demo sea interactiva y coherente. La disponibilidad y las tarifas
 * definitivas las confirma el hotel.
 */

const ITBIS = 0.18; // Impuesto dominicano
const SERVICE = 0.1; // Ley de propina (10%)

/** Hash determinista de cadena → número en [0, 1). */
function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function isWeekend(iso: string): boolean {
  const day = new Date(`${iso}T00:00:00`).getDay();
  return day === 5 || day === 6; // viernes y sábado
}

/** ¿La categoría está disponible en una fecha concreta? (simulado, ~85%). */
export function isDateAvailable(roomId: RoomCategoryId, iso: string): boolean {
  return seeded(`${roomId}|avail|${iso}`) > 0.15;
}

/**
 * Precio por noche (USD) para una categoría y fecha, o null si la categoría no
 * tiene tarifa de referencia publicada.
 */
export function nightlyPrice(
  roomId: RoomCategoryId,
  iso: string,
): number | null {
  const room = rooms.find((r) => r.id === roomId);
  if (!room?.price) return null;
  const base = Math.round((room.price.from + room.price.to) / 2);
  const weekend = isWeekend(iso) ? 1.15 : 1;
  const season = 1 + (seeded(`${roomId}|season|${iso.slice(0, 7)}`) - 0.5) * 0.12;
  return Math.round(base * weekend * season);
}

/** Enumera las fechas ISO de las noches entre check-in y check-out. */
export function enumerateNights(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  if (!checkIn || !checkOut) return out;
  let cur = checkIn;
  let guard = 0;
  while (cur < checkOut && guard < 400) {
    out.push(cur);
    cur = addDaysISO(cur, 1);
    guard += 1;
  }
  return out;
}

export interface QuoteNight {
  date: string;
  price: number | null;
  available: boolean;
}

export interface Quote {
  roomId: RoomCategoryId;
  nights: number;
  breakdown: QuoteNight[];
  subtotal: number;
  taxes: number;
  total: number;
  hasPrice: boolean;
  fullyAvailable: boolean;
  unavailableDates: string[];
  taxRate: number;
}

/** Calcula el presupuesto (disponibilidad + precio) para una estancia. */
export function getQuote(
  roomId: RoomCategoryId,
  checkIn: string,
  checkOut: string,
): Quote {
  const nights = enumerateNights(checkIn, checkOut);
  const breakdown: QuoteNight[] = nights.map((date) => ({
    date,
    price: nightlyPrice(roomId, date),
    available: isDateAvailable(roomId, date),
  }));

  const hasPrice = breakdown.some((n) => n.price !== null);
  const subtotal = breakdown.reduce((sum, n) => sum + (n.price ?? 0), 0);
  const taxes = hasPrice ? Math.round(subtotal * (ITBIS + SERVICE)) : 0;
  const unavailableDates = breakdown
    .filter((n) => !n.available)
    .map((n) => n.date);

  return {
    roomId,
    nights: nights.length,
    breakdown,
    subtotal,
    taxes,
    total: subtotal + taxes,
    hasPrice,
    fullyAvailable: unavailableDates.length === 0,
    unavailableDates,
    taxRate: ITBIS + SERVICE,
  };
}

/**
 * Devuelve las fechas dentro de un rango en las que la categoría NO está
 * disponible (para deshabilitarlas en el calendario).
 */
export function unavailableDatesInRange(
  roomId: RoomCategoryId,
  startIso: string,
  endIso: string,
): Set<string> {
  const set = new Set<string>();
  let cur = startIso;
  let guard = 0;
  while (cur <= endIso && guard < 400) {
    if (!isDateAvailable(roomId, cur)) set.add(cur);
    cur = addDaysISO(cur, 1);
    guard += 1;
  }
  return set;
}
