'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { rooms } from '@/data/rooms';
import { contact } from '@/data/hotel';
import { addDaysISO, todayISO, validateStay } from '@/lib/dates';
import { buildStayMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { getQuote } from '@/lib/availability';
import { useBooking } from '@/components/booking/BookingProvider';
import type { RoomCategoryId, StayQuery } from '@/types';

export function StaySearch() {
  const today = useMemo(() => todayISO(), []);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState<RoomCategoryId | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [result, setResult] = useState<StayQuery | null>(null);
  const { openBooking } = useBooking();

  const minCheckOut = checkIn ? addDaysISO(checkIn, 1) : addDaysISO(today, 1);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round((+new Date(checkOut) - +new Date(checkIn)) / 86400000),
        )
      : 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateStay(checkIn, checkOut);
    if (!validation.valid) {
      setError(validation.error);
      setSent(false);
      setResult(null);
      return;
    }
    setError(null);
    setResult({ checkIn, checkOut, guests, roomType });
    setSent(true);
  }

  return (
    <section id="disponibilidad" className="relative z-20 -mt-16 sm:-mt-20">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-ocean-100 bg-cream p-6 shadow-card sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl text-ocean-800">
              Consulta tu estancia
            </h2>
            <p className="text-sm text-ocean-600/80">
              Te prepararemos una consulta para enviar por WhatsApp al hotel.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Entrada</span>
              <input
                type="date"
                name="checkIn"
                min={today}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value && checkOut <= e.target.value) {
                    setCheckOut(addDaysISO(e.target.value, 1));
                  }
                }}
                className="w-full rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Salida</span>
              <input
                type="date"
                name="checkOut"
                min={minCheckOut}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Huéspedes</span>
              <select
                name="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'huésped' : 'huéspedes'}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">
                Tipo de habitación
              </span>
              <select
                name="roomType"
                value={roomType}
                onChange={(e) =>
                  setRoomType(e.target.value as RoomCategoryId | '')
                }
                className="w-full rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              >
                <option value="">Cualquier categoría</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-[1.25rem] text-sm">
              {error ? (
                <p role="alert" className="text-red-700">
                  {error}
                </p>
              ) : sent ? (
                <p className="text-ocean-700">
                  Consulta preparada. Revisa el resultado y solicita tu reserva.
                </p>
              ) : null}
            </div>
            <Button type="submit" variant="whatsapp" size="lg">
              <Icon name="whatsapp" className="text-lg" />
              Consultar disponibilidad
            </Button>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ocean-600/80">
            <Icon name="check" className="mt-0.5 text-sm text-gold-500" />
            La disponibilidad y las tarifas deben ser confirmadas por el hotel.
            Esta demo no comprueba inventario ni realiza reservas reales.
          </p>
        </form>

        {result ? (
          <div className="mt-6 rounded-2xl border border-ocean-100 bg-white p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-ocean-800">
                  Consulta preparada
                </h3>
                <p className="mt-1 text-sm text-ocean-600">
                  {result.checkIn} → {result.checkOut} · {nights}{' '}
                  {nights === 1 ? 'noche' : 'noches'} · {result.guests}{' '}
                  {result.guests === 1 ? 'huésped' : 'huéspedes'}
                </p>
              </div>
              <Button
                href={buildWhatsAppUrl(
                  contact.whatsappNumber,
                  buildStayMessage(
                    result,
                    rooms.find((r) => r.id === result.roomType)?.name,
                  ),
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="md"
              >
                <Icon name="whatsapp" className="text-lg" />
                Enviar por WhatsApp
              </Button>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rooms
                .filter((r) => !result.roomType || r.id === result.roomType)
                .map((r) => {
                  const quote =
                    nights > 0
                      ? getQuote(r.id, result.checkIn, result.checkOut)
                      : null;
                  const nightly =
                    quote?.breakdown.find((n) => n.price !== null)?.price ?? null;
                  return (
                    <li
                      key={r.id}
                      className="flex flex-col rounded-xl border border-ocean-100 p-4"
                    >
                      <p className="font-display text-lg text-ocean-800">
                        {r.name}
                      </p>
                      <p className="mt-1 text-sm text-ocean-600">
                        {quote?.hasPrice && nightly !== null
                          ? `US$${nightly} / noche`
                          : 'Consultar tarifa'}
                      </p>
                      {quote?.hasPrice ? (
                        <p className="mt-1 text-xs text-ocean-500">
                          Total estimado US${quote.total} · {quote.nights}{' '}
                          {quote.nights === 1 ? 'noche' : 'noches'} con impuestos
                        </p>
                      ) : null}
                      {quote ? (
                        <span
                          className={`mt-2 inline-block self-start rounded-full px-2 py-0.5 text-[0.7rem] ${
                            quote.fullyAvailable
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {quote.fullyAvailable
                            ? 'Disponible'
                            : 'No disponible en esas fechas'}
                        </span>
                      ) : null}
                      <Button
                        variant="primary"
                        size="md"
                        className="mt-4"
                        onClick={() =>
                          openBooking({
                            checkIn: result.checkIn,
                            checkOut: result.checkOut,
                            guests: result.guests,
                            roomId: r.id,
                          })
                        }
                      >
                        Solicitar reserva
                      </Button>
                    </li>
                  );
                })}
            </ul>

            <p className="mt-6 text-xs text-ocean-500">
              Resultado orientativo. No es una reserva confirmada: la disponibilidad
              y las tarifas definitivas las confirma el hotel.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
