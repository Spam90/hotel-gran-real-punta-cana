'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import { Icon } from '@/components/icons';
import { rooms } from '@/data/rooms';
import { contact } from '@/data/hotel';
import { validateStay } from '@/lib/dates';
import { longDate } from '@/lib/calendar';
import { getQuote, isDateAvailable } from '@/lib/availability';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { BookingPrefill, RoomCategoryId } from '@/types';

type Step = 'fechas' | 'habitacion' | 'datos' | 'confirmado';

const inputClass =
  'rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40';

const steps: { id: Exclude<Step, 'confirmado'>; label: string }[] = [
  { id: 'fechas', label: 'Fechas' },
  { id: 'habitacion', label: 'Habitación' },
  { id: 'datos', label: 'Tus datos' },
];

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  prefill?: BookingPrefill;
}

function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((+new Date(b) - +new Date(a)) / 86400000));
}

export function BookingModal({ open, onClose, prefill }: BookingModalProps) {
  const [step, setStep] = useState<Step>('fechas');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState<RoomCategoryId | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (!open) return;
    setStep('fechas');
    setError(null);
    setReference('');
    setCheckIn(prefill?.checkIn ?? '');
    setCheckOut(prefill?.checkOut ?? '');
    setGuests(prefill?.guests ?? 2);
    setRoomId(prefill?.roomId ?? '');
    setName('');
    setEmail('');
    setPhone('');
  }, [open, prefill]);

  const nights = nightsBetween(checkIn, checkOut);
  const room = rooms.find((r) => r.id === roomId);

  const message = useMemo(() => {
    const lines = [
      'Hola, quiero solicitar una reserva en el Hotel Gran Real Punta Cana.',
      name ? `A nombre de: ${name}` : '',
      `Entrada: ${checkIn}`,
      `Salida: ${checkOut} (${nights} ${nights === 1 ? 'noche' : 'noches'})`,
      `Huéspedes: ${guests}`,
      room ? `Categoría: ${room.name}` : '',
      reference ? `Referencia: ${reference}` : '',
      '¿Podrían confirmarme disponibilidad y tarifas? Gracias.',
    ].filter(Boolean);
    return lines.join('\n');
  }, [name, checkIn, checkOut, nights, guests, room, reference]);

  function goNext() {
    setError(null);
    if (step === 'fechas') {
      const v = validateStay(checkIn, checkOut);
      if (!v.valid) {
        setError(v.error);
        return;
      }
      setStep('habitacion');
      return;
    }
    if (step === 'habitacion') {
      if (!roomId) {
        setError('Selecciona una categoría de habitación.');
        return;
      }
      const quote = getQuote(roomId, checkIn, checkOut);
      if (nights > 0 && !quote.fullyAvailable) {
        setError(
          'La categoría seleccionada no está disponible en esas fechas. Vuelve atrás y elige otras.',
        );
        return;
      }
      setStep('datos');
    }
  }

  function goBack() {
    setError(null);
    if (step === 'habitacion') setStep('fechas');
    if (step === 'datos') setStep('habitacion');
  }

  function confirm() {
    setError(null);
    if (name.trim().length < 2) {
      setError('Indica tu nombre completo.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Indica un correo electrónico válido.');
      return;
    }
    if (phone.replace(/[^0-9]/g, '').length < 7) {
      setError('Indica un teléfono de contacto válido.');
      return;
    }
    setReference(`GR-${Date.now().toString().slice(-6)}`);
    setStep('confirmado');
  }

  const title = step === 'confirmado' ? 'Reserva enviada' : 'Solicitar reserva';

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {step !== 'confirmado' ? (
        <ol className="mb-6 flex items-center gap-2 text-xs">
          {steps.map((s, i) => {
            const currentIndex = steps.findIndex((x) => x.id === step);
            const state =
              i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'todo';
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    state === 'todo'
                      ? 'bg-ocean-100 text-ocean-500'
                      : 'bg-gold-500 text-ocean-900'
                  }`}
                >
                  {state === 'done' ? <Icon name="check" className="text-sm" /> : i + 1}
                </span>
                <span
                  className={`hidden sm:inline ${
                    state === 'active'
                      ? 'font-semibold text-ocean-800'
                      : 'text-ocean-500'
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 ? (
                  <span className="h-px flex-1 bg-ocean-100" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ol>
      ) : null}

      {step === 'fechas' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Calendar
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(ci, co) => {
              setCheckIn(ci);
              setCheckOut(co);
            }}
            isDayDisabled={
              roomId ? (iso) => !isDateAvailable(roomId, iso) : undefined
            }
          />

          <div className="flex flex-col gap-4">
            <div className="rounded-lg bg-sand-50 p-4 text-sm">
              <p className="text-ocean-700">
                <strong>Entrada:</strong>{' '}
                {checkIn ? longDate(checkIn) : 'sin seleccionar'}
              </p>
              <p className="mt-1 text-ocean-700">
                <strong>Salida:</strong>{' '}
                {checkOut ? longDate(checkOut) : 'sin seleccionar'}
              </p>
              <p className="mt-1 text-ocean-700">
                <strong>Noches:</strong> {nights}
              </p>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Huéspedes</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className={inputClass}
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'huésped' : 'huéspedes'}
                  </option>
                ))}
              </select>
            </label>

            {nights > 0 ? (
              <p className="flex items-center gap-2 text-sm text-ocean-600">
                <Icon name="check" className="text-base text-gold-500" />
                {nights} {nights === 1 ? 'noche' : 'noches'} seleccionadas
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {step === 'habitacion' ? (
        <ul className="grid gap-3">
          {rooms.map((r) => {
            const selected = r.id === roomId;
            const quote = nights > 0 ? getQuote(r.id, checkIn, checkOut) : null;
            const blocked = quote ? !quote.fullyAvailable : false;
            const nightly =
              quote?.breakdown.find((n) => n.price !== null)?.price ?? null;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setRoomId(r.id)}
                  disabled={blocked}
                  aria-pressed={selected}
                  className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition ${
                    blocked
                      ? 'cursor-not-allowed border-ocean-100 opacity-60'
                      : selected
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-ocean-100 hover:border-ocean-200'
                  }`}
                >
                  <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg text-ocean-800">
                      {r.name}
                    </span>
                    <span className="block text-xs text-ocean-600">
                      {r.features.slice(0, 3).join(' · ')}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-gold-600">
                      {quote?.hasPrice && nightly !== null
                        ? `US$${nightly} / noche · Total US$${quote.total}`
                        : 'Consultar tarifa'}
                    </span>
                    {quote ? (
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[0.7rem] ${
                          blocked
                            ? 'bg-red-50 text-red-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {blocked
                          ? 'Sin disponibilidad en estas fechas'
                          : 'Disponible para tus fechas'}
                      </span>
                    ) : null}
                  </span>
                  {selected ? (
                    <Icon name="check" className="text-xl text-gold-500" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {step === 'datos' ? (
        <div className="grid gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">
              Nombre completo
            </span>
            <input
              type="text"
              value={name}
              autoComplete="name"
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">
              Correo electrónico
            </span>
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ocean-700">Teléfono</span>
            <input
              type="tel"
              value={phone}
              autoComplete="tel"
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </label>
          {roomId && nights > 0 ? (
            <div className="rounded-xl bg-sand-50 p-4 text-sm">
              <p className="mb-2 font-medium text-ocean-800">
                Presupuesto estimado
              </p>
              {(() => {
                const quote = getQuote(roomId, checkIn, checkOut);
                if (!quote.hasPrice) {
                  return (
                    <p className="text-ocean-600">
                      Esta categoría no tiene tarifa de referencia publicada:
                      consultar con el hotel.
                    </p>
                  );
                }
                return (
                  <>
                    <div className="flex justify-between">
                      <span className="text-ocean-500">
                        Subtotal · {quote.nights}{' '}
                        {quote.nights === 1 ? 'noche' : 'noches'}
                      </span>
                      <span>US${quote.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ocean-500">
                        Impuestos y servicio ({Math.round(quote.taxRate * 100)}%)
                      </span>
                      <span>US${quote.taxes}</span>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-ocean-200 pt-2 font-semibold text-ocean-800">
                      <span>Total estimado</span>
                      <span>US${quote.total}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : null}
          <p className="rounded-lg bg-ocean-50 p-3 text-xs text-ocean-600">
            Demo sin pago: no se procesa ningún cobro ni se envía información a
            servicios externos.
          </p>
        </div>
      ) : null}

      {step === 'confirmado' ? (
        <div className="text-center">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
            <Icon name="check" className="text-3xl" />
          </span>
          <h4 className="mt-4 font-display text-2xl text-ocean-800">
            Reserva enviada al hotel
          </h4>
          <p className="mt-2 text-sm text-ocean-600">
            Hemos preparado tu solicitud. El hotel confirmará disponibilidad y
            tarifas.
          </p>
          <dl className="mt-6 space-y-2 rounded-xl bg-sand-50 p-4 text-left text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-ocean-500">Referencia</dt>
              <dd className="font-medium text-ocean-800">{reference}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ocean-500">Entrada</dt>
              <dd className="font-medium text-ocean-800">{checkIn}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ocean-500">Salida</dt>
              <dd className="font-medium text-ocean-800">{checkOut}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ocean-500">Huéspedes</dt>
              <dd className="font-medium text-ocean-800">{guests}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ocean-500">Categoría</dt>
              <dd className="font-medium text-ocean-800">{room?.name}</dd>
            </div>
            {room?.price ? (
              <div className="flex justify-between gap-3">
                <dt className="text-ocean-500">Total estimado</dt>
                <dd className="font-medium text-ocean-800">
                  {(() => {
                    const quote = getQuote(room.id, checkIn, checkOut);
                    if (!quote.hasPrice) return 'A confirmar';
                    return `US$${quote.total} · ${
                      quote.nights
                    } ${quote.nights === 1 ? 'noche' : 'noches'} con impuestos`;
                  })()}
                </dd>
              </div>
            ) : (
              <div className="flex justify-between gap-3">
                <dt className="text-ocean-500">Tarifa</dt>
                <dd className="font-medium text-ocean-800">A confirmar</dd>
              </div>
            )}
          </dl>
          <p className="mt-4 text-xs text-ocean-500">
            Demo: la reserva no queda registrada en ningún sistema del hotel hasta
            que la confirmen por WhatsApp o teléfono.
          </p>
        </div>
      ) : null}

      <div className="mt-6 min-h-[1.25rem] text-sm">
        {error ? (
          <p role="alert" className="text-red-700">
            {error}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step === 'fechas' ? (
          <Button variant="ghost" size="lg" onClick={onClose}>
            Cancelar
          </Button>
        ) : step !== 'confirmado' ? (
          <Button variant="ghost" size="lg" onClick={goBack}>
            Volver
          </Button>
        ) : (
          <Button variant="ghost" size="lg" onClick={onClose}>
            Cerrar
          </Button>
        )}

        {step === 'datos' ? (
          <Button variant="primary" size="lg" onClick={confirm}>
            Confirmar solicitud
          </Button>
        ) : step === 'confirmado' ? (
          <Button
            href={buildWhatsAppUrl(contact.whatsappNumber, message)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <Icon name="whatsapp" className="text-lg" />
            Enviar por WhatsApp
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={goNext}>
            Continuar
          </Button>
        )}
      </div>
    </Modal>
  );
}