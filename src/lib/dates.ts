import type { PriceReference } from '@/types';

/** Devuelve la fecha de hoy en formato ISO local (yyyy-mm-dd). */
export function todayISO(): string {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10);
}

/** Suma un número de días a una fecha ISO y devuelve otra fecha ISO. */
export function addDaysISO(iso: string, days: number): string {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export interface StayValidation {
  valid: boolean;
  /** Mensaje de error legible, o null si es válido. */
  error: string | null;
}

/**
 * Valida coherencia de fechas: entrada obligatoria, salida posterior a la entrada
 * y entrada no anterior a hoy.
 */
export function validateStay(
  checkIn: string,
  checkOut: string,
): StayValidation {
  if (!checkIn || !checkOut) {
    return { valid: false, error: 'Selecciona las fechas de entrada y salida.' };
  }
  if (checkIn < todayISO()) {
    return { valid: false, error: 'La fecha de entrada no puede ser anterior a hoy.' };
  }
  if (checkOut <= checkIn) {
    return {
      valid: false,
      error: 'La fecha de salida debe ser posterior a la de entrada.',
    };
  }
  return { valid: true, error: null };
}

/** Formatea el rango de precio de referencia, p. ej. "US$57 – US$68". */
export function formatPriceRange(price: PriceReference): string {
  if (price.from === price.to) {
    return `US$${price.from}`;
  }
  return `US$${price.from} – US$${price.to}`;
}
