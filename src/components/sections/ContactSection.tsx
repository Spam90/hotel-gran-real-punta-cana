'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons';
import { contact, hotel } from '@/data/hotel';
import { addDaysISO, todayISO, validateStay } from '@/lib/dates';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function ContactSection() {
  const today = useMemo(() => todayISO(), []);
  const [name, setName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const minCheckOut = checkIn ? addDaysISO(checkIn, 1) : addDaysISO(today, 1);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError('Indícanos tu nombre para preparar la consulta.');
      setSent(false);
      return;
    }
    const validation = validateStay(checkIn, checkOut);
    if (!validation.valid) {
      setError(validation.error);
      setSent(false);
      return;
    }
    setError(null);

    const message = [
      `Hola, soy ${name.trim()}.`,
      'Me gustaría consultar disponibilidad en el Hotel Gran Real Punta Cana.',
      `Entrada: ${checkIn}`,
      `Salida: ${checkOut}`,
      `Huéspedes: ${guests}`,
      '¿Podrían confirmarme disponibilidad y tarifas? Gracias.',
    ].join('\n');

    window.open(
      buildWhatsAppUrl(contact.whatsappNumber, message),
      '_blank',
      'noopener,noreferrer',
    );
    setSent(true);
  }

  return (
    <section id="contacto" className="bg-sand-50 py-20 sm:py-24">
      <div className="container grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
            Contacto
          </p>
          <h2 className="font-display text-3xl leading-tight text-ocean-800 sm:text-4xl">
            Consulta tu estancia
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ocean-600/90">
            Escríbenos o llama para confirmar disponibilidad y tarifas. El equipo
            del {hotel.name} te responderá directamente.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`tel:${contact.phoneTel}`}
              className="flex items-center gap-3 rounded-xl border border-ocean-100 bg-white p-4 shadow-soft transition-colors hover:border-gold-300"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
                <Icon name="phone" className="text-xl" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-ocean-500">
                  Teléfono
                </span>
                <span className="font-medium text-ocean-800">
                  {contact.phoneDisplay}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-3 rounded-xl border border-ocean-100 bg-white p-4 shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
                <Icon name="location" className="text-xl" />
              </span>
              <span className="text-sm text-ocean-700">
                {contact.addressLine}, {contact.city}
                <br />
                {contact.region}, {contact.country}
                <br />
                <span className="text-ocean-500">
                  Correo electrónico pendiente de confirmación.
                </span>
              </span>
            </div>

            <Button href="#disponibilidad" variant="ghost" size="lg">
              <Icon name="calendar" className="text-lg" />
              Ir al buscador de estancia
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-card sm:p-8"
        >
          <h3 className="font-display text-xl text-ocean-800">
            Formulario de consulta
          </h3>
          <p className="mt-1 text-sm text-ocean-600/80">
            Prepararemos tu consulta para enviarla por WhatsApp. No se almacena
            información en esta demo.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Nombre</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
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
                  className="rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ocean-700">Huéspedes</span>
              <select
                name="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="rounded-lg border border-ocean-200 bg-white px-3 py-2.5 text-sm text-ocean-800 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
              >
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'huésped' : 'huéspedes'}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 min-h-[1.25rem] text-sm">
            {error ? (
              <p role="alert" className="text-red-700">
                {error}
              </p>
            ) : sent ? (
              <p className="text-ocean-700">
                Hemos abierto WhatsApp con tu consulta lista para enviar.
              </p>
            ) : null}
          </div>

          <Button type="submit" variant="whatsapp" size="lg" className="mt-2 w-full">
            <Icon name="whatsapp" className="text-lg" />
            Enviar consulta por WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}
